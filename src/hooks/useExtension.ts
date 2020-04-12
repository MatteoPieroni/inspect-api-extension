import { useState, useEffect } from "react";
import { DataCollection } from "../types";

export const useExtension = () => {
  const [data, setData] = useState<DataCollection | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    chrome.runtime.connect();

    const getBackgroundData: (data: DataCollection) => void = (data) => {
      try {
        setData(data);
      } catch (e) {
        setError(e);
      }
    };

    chrome.runtime.onMessage.addListener(getBackgroundData);
  }, []);

  return { data, error };
};
