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
  FILTER,
  REFRESH_DATA,
} from "./utils/tableReducers";
import { DUPLICATES, REGEX } from "./utils/filters";

export const useTableData: (originalData: Data[]) => TableData = (
  originalData
) => {
  const [state, dispatch] = useReducer(
    tableDataReducer,
    originalData,
    initState
  );
  const { data, activeOrder } = state;

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

  const findDuplicates: FindDuplicates = (key, identifier) => {
    dispatch({
      type: FILTER,
      payload: { filter: DUPLICATES, key, data: originalData, identifier },
    });
  };

  const search: Search = (keyword) => {
    dispatch({ type: SEARCH, payload: { keyword, data: originalData } });
  };

  const regex: Regex = (pattern, identifier, key) => {
    dispatch({
      type: FILTER,
      payload: { filter: REGEX, pattern, key, identifier, data: originalData },
    });
  };

  const reset: Reset = () => {
    console.log(originalData);
    dispatch({ type: RESET_ORDER, payload: { data: originalData } });
  };

  return {
    headerKeys,
    data,
    activeOrder,
    orderByKey,
    reset,
    findDuplicates,
    search,
    regex,
  };
};
