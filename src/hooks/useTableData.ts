import { useMemo, useReducer } from "react";

import { Data } from "../types";
import { innerSort } from "../utils/innerSort";

const RESET = "RESET";
const ORDER = "ORDER";
const FILTER_DUPLICATES = "FILTER_DUPLICATES";
const SEARCH = "SEARCH";

interface TableData {
  headerKeys: (keyof Data)[];
  data: Data[];
  orderByKey: (key: keyof Data, isAsc?: boolean) => void;
  reset: () => void;
  activeFilter: keyof Data | "";
  findDuplicates: (key: keyof Data | undefined) => void;
  search: (keyword: string) => void;
}

interface TableState {
  data: Data[];
  activeFilter: keyof Data | "";
  activeOrderIsAsc: boolean;
}

interface ResetAction {
  type: typeof RESET;
  payload: { data: Data[] };
}
interface OrderAction {
  type: typeof ORDER;
  payload: { key: keyof Data; isAsc: boolean };
}
interface FilterDuplicatesAction {
  type: typeof FILTER_DUPLICATES;
  payload: { key: keyof Data | undefined; data: Data[] };
}
interface SearchAction {
  type: typeof SEARCH;
  payload: { keyword: string; data: Data[] };
}

type ReducerAction =
  | ResetAction
  | OrderAction
  | FilterDuplicatesAction
  | SearchAction;

const initState: (data: Data[]) => TableState = initialData => {
  return {
    data: initialData,
    activeFilter: "",
    activeOrderIsAsc: true
  };
};

const tableDataReducer: React.Reducer<TableState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ORDER:
      return {
        data: [...state.data].sort((a, b) =>
          innerSort(a, b, action.payload.key, action.payload.isAsc)
        ),
        activeFilter: action.payload.key,
        activeOrderIsAsc: action.payload.isAsc
      };
    case FILTER_DUPLICATES:
      if (!action.payload.key) {
        return {
          ...state,
          data: action.payload.data
        };
      }

      const keyValues: string[] = action.payload.data.map(
        element => element[action.payload.key as keyof Data]
      );
      const duplicatesArray: Data[] = action.payload.data.filter(
        (element, index) => {
          if (
            keyValues.indexOf(
              element[action.payload.key as keyof Data],
              index + 1
            ) > -1
          ) {
            return element;
          }

          // for the last item compare with previous values
          if (index === action.payload.data.length - 1) {
            if (
              keyValues.indexOf(element[action.payload.key as keyof Data]) !==
              index
            ) {
              return element;
            }
          }
        }
      );

      if (state.activeFilter) {
        return {
          ...state,
          data: [...duplicatesArray].sort((a, b) =>
            innerSort(a, b, state.activeFilter, state.activeOrderIsAsc)
          )
        };
      }

      return {
        ...state,
        data: duplicatesArray
      };
    case SEARCH:
      if (!action.payload.keyword) {
        return {
          ...state,
          data: action.payload.data
        };
      }

      const searchResults = state.data.filter(el =>
        el.url.includes(action.payload.keyword)
      );

      if (state.activeFilter) {
        return {
          ...state,
          data: [...searchResults].sort((a, b) =>
            innerSort(a, b, state.activeFilter, state.activeOrderIsAsc)
          )
        };
      }

      return {
        ...state,
        data: searchResults
      };
    case RESET:
      return initState(action.payload.data);
    default:
      return state;
  }
};

export const useTableData: (
  originalData: Data[]
) => TableData = originalData => {
  const [state, dispatch] = useReducer(
    tableDataReducer,
    originalData,
    initState
  );
  const { data, activeFilter } = state;

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
