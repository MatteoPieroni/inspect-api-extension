import { innerSort } from "../../utils/innerSort";
import { Data } from "../../types";
import {
  OrderByKey,
  Reset,
  FindDuplicates,
  Search,
  Regex,
} from "./TableDataTypes";
import {
  DUPLICATES,
  REGEX,
  Filters,
  applyFilters,
  ApplyFiltersSettings,
} from "./filters";

export const RESET_ORDER = "RESET_ORDER";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const SEARCH = "SEARCH";
export const REFRESH_DATA = "REFRESH_DATA";

export type HeaderKeys = (keyof Data)[];
export type ActiveFilter = keyof Data | "";
export type ActiveSearch = string;
export type ActiveRegex = RegExp | "";

export interface TableData {
  headerKeys: HeaderKeys;
  data: Data[];
  orderByKey: OrderByKey;
  reset: Reset;
  activeOrder: ActiveFilter;
  findDuplicates: FindDuplicates;
  search: Search;
  regex: Regex;
}

export type StateFilter = [keyof typeof Filters, ApplyFiltersSettings, string];

interface TableState {
  data: Data[];
  activeOrder: ActiveFilter;
  activeOrderIsAsc: boolean;
  activeFilters: StateFilter[];
  activeSearch: ActiveSearch;
}

interface ResetAction {
  type: typeof RESET_ORDER;
  payload: { data: Data[] };
}
interface OrderAction {
  type: typeof ORDER;
  payload: { key: keyof Data; isAsc: boolean };
}
export interface RegexPayload {
  filter: typeof REGEX;
  key: keyof Data | undefined;
  pattern?: RegExp | "";
  identifier: string;
  data: Data[];
}
interface DuplicatesPayload {
  filter: typeof DUPLICATES;
  key: keyof Data | undefined;
  identifier: string;
  data: Data[];
}
interface FilterAction {
  type: typeof FILTER;
  payload: RegexPayload | DuplicatesPayload;
}
interface SearchAction {
  type: typeof SEARCH;
  payload: { keyword: string; data: Data[] };
}
interface RegexAction {
  type: typeof REGEX;
  payload: { pattern: RegExp | ""; data: Data[]; key?: keyof Data };
}
interface RefreshAction {
  type: typeof REFRESH_DATA;
  payload: { data: Data[] };
}

export type ReducerAction =
  | ResetAction
  | OrderAction
  | FilterAction
  | SearchAction
  | RegexAction
  | RefreshAction;

export const initState: (data: Data[]) => TableState = (initialData) => {
  return {
    data: initialData,
    activeOrder: "",
    activeOrderIsAsc: true,
    activeFilters: [],
    activeSearch: "",
    activeDuplicateFilter: "",
    activeRegex: "",
  };
};

const orderData: (
  array: Data[],
  filter: keyof Data,
  isAsc: boolean
) => Data[] = (array, filter, isAsc) =>
  // we need to copy the array as sort modifies the original array
  [...array].sort((a, b) => innerSort(a, b, filter, isAsc));

const search: (data: Data[], keyword: string) => Data[] = (data, keyword) =>
  data.filter((el) => el.url.includes(keyword));

const dataFlow: (state: TableState, data?: Data[]) => Data[] = (
  state,
  data
) => {
  const {
    data: stateData,
    activeOrder,
    activeOrderIsAsc,
    activeFilters,
    activeSearch,
  } = state;
  let finalData = (data && data.length > 0 && data) || stateData;

  // search
  if (activeSearch) {
    finalData = search(finalData, activeSearch);
  }

  // order
  if (activeOrder) {
    finalData = orderData(finalData, activeOrder, activeOrderIsAsc);
  }

  // filter duplicates
  if (activeFilters.length > 0) {
    finalData = applyFilters(activeFilters, finalData);
  }

  // return new data
  return finalData;
};

export const tableDataReducer: React.Reducer<TableState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case REFRESH_DATA:
      // re-execute all flow
      return {
        ...state,
        data: dataFlow(state, action.payload.data),
      };

    case ORDER:
      // only order data in state
      return {
        ...state,
        data: orderData(
          [...state.data],
          action.payload.key,
          action.payload.isAsc
        ),
        activeOrder: action.payload.key,
        activeOrderIsAsc: action.payload.isAsc,
      };

    case FILTER:
      let duplicateState = state;
      const regexPayload = action.payload as RegexPayload;
      const isFilterInArray =
        state.activeFilters.findIndex(
          (currentFilter) => currentFilter[2] === action.payload.identifier
        ) > -1;

      if (isFilterInArray) {
        duplicateState = {
          ...duplicateState,
          activeFilters: duplicateState.activeFilters.filter(
            (filt) => filt[2] !== action.payload.identifier
          ),
        };
      } else {
        duplicateState = {
          ...duplicateState,
          activeFilters: [
            ...duplicateState.activeFilters,
            [
              action.payload.filter,
              {
                key: action.payload.key,
                ...(regexPayload.pattern && {
                  pattern: regexPayload.pattern,
                }),
              },
              action.payload.identifier,
            ],
          ],
        };
      }

      // re-execute whole flow
      return {
        ...duplicateState,
        data: dataFlow(duplicateState, action.payload.data),
      };

    case SEARCH:
      let searchState = state;

      // reset search
      if (!action.payload.keyword) {
        searchState = {
          ...searchState,
          activeSearch: "",
        };
      } else {
        searchState = {
          ...searchState,
          activeSearch: action.payload.keyword,
        };
      }

      return {
        ...searchState,
        data: dataFlow(searchState, action.payload.data),
      };

    case RESET_ORDER:
      const resetOrderState = {
        ...state,
        activeOrder: "" as "",
        activeOrderIsAsc: true,
      };

      return {
        ...resetOrderState,
        data: dataFlow(resetOrderState, action.payload.data),
      };

    default:
      return state;
  }
};
