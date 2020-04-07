import { useState, useEffect } from "react";
import { expandHeight, collapseHeight } from "./utils/toggle";

interface UseToggle {
  isExpanded: boolean;
  toggle: () => void;
}

export const useToggle: (
  elemRef: React.MutableRefObject<HTMLElement | null>,
  initialValue?: boolean
) => UseToggle = (elem, initialValue = false) => {
  const [isExpanded, setIsExpanded] = useState(initialValue);

  useEffect(() => {
    // this variable is hoisted, thus referencing
    // the element of the previous re-run when running
    // a successive time
    const element = elem.current;

    elem.current?.classList.add("toggle");

    return () => element?.classList.remove("toggle");
  }, [elem]);

  useEffect(() => {
    if (elem.current) {
      return isExpanded
        ? expandHeight(elem.current)
        : collapseHeight(elem.current);
    }
  }, [elem, isExpanded]);

  return {
    toggle: () => setIsExpanded(!isExpanded),
    isExpanded,
  };
};
