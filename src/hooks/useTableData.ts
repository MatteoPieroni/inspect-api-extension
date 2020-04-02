import { useMemo, useReducer, useEffect } from "react";

import { Data } from "../types";
import {
  initState,
  tableDataReducer,
  TableData,
  ORDER,
  RESET,
  SEARCH,
  FILTER_DUPLICATES,
  REFRESH_DATA
} from "./utils/tableReducers";

export const useTableData: (
  originalData: Data[]
) => TableData = originalData => {
  const [state, dispatch] = useReducer(
    tableDataReducer,
    originalData,
    initState
  );
  const { data, activeFilter } = state;

  useEffect(() => {
    dispatch({ type: REFRESH_DATA, payload: { data: originalData } });
  }, [originalData]);

  const headerKeys: (keyof Data)[] = useMemo(
    () =>
      originalData.reduce((finalArray: any[], element) => {
        return [...finalArray, ...Object.keys(element)];
      }, []),
    [originalData]
  );

  const orderByKey = (key: keyof Data, isAsc: boolean = true) => {
    dispatch({ type: ORDER, payload: { key, isAsc } });
  };

  const findDuplicates = (key: keyof Data | undefined) => {
    dispatch({ type: FILTER_DUPLICATES, payload: { key, data: originalData } });
  };

  const search = (keyword: string) => {
    dispatch({ type: SEARCH, payload: { keyword, data: originalData } });
  };

  const reset = () => {
    dispatch({ type: RESET, payload: { data: originalData } });
  };

  return {
    headerKeys,
    data,
    activeFilter,
    orderByKey,
    reset,
    findDuplicates,
    search
  };
};
