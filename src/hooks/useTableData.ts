import { useMemo, useReducer, useEffect } from "react";

import { Data } from "../types";
import {
  OrderByKey,
  Search,
  FindDuplicates,
  Reset,
  Regex,
} from "./utils/TableDataTypes";
import {
  initState,
  tableDataReducer,
  TableData,
  ORDER,
  RESET_ORDER,
  SEARCH,
  FILTER_DUPLICATES,
  REFRESH_DATA,
  REGEX,
} from "./utils/tableReducers";

export const useTableData: (originalData: Data[]) => TableData = (
  originalData
) => {
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

  const orderByKey: OrderByKey = (key, isAsc = true) => {
    dispatch({ type: ORDER, payload: { key, isAsc } });
  };

  const findDuplicates: FindDuplicates = (key) => {
    dispatch({ type: FILTER_DUPLICATES, payload: { key, data: originalData } });
  };

  const search: Search = (keyword) => {
    dispatch({ type: SEARCH, payload: { keyword, data: originalData } });
  };

  const regex: Regex = (pattern) => {
    dispatch({ type: REGEX, payload: { pattern, data: originalData } });
  };

  const reset: Reset = () => {
    dispatch({ type: RESET_ORDER, payload: { data: originalData } });
  };

  return {
    headerKeys,
    data,
    activeFilter,
    orderByKey,
    reset,
    findDuplicates,
    search,
    regex,
  };
};
