import { innerSort } from "../../utils/innerSort";
import { Data } from "../../types";
import { OrderByKey, Reset, FindDuplicates, Search } from "./TableDataTypes";

export const RESET_ORDER = "RESET_ORDER";
export const ORDER = "ORDER";
export const FILTER_DUPLICATES = "FILTER_DUPLICATES";
export const SEARCH = "SEARCH";
export const REFRESH_DATA = "REFRESH_DATA";

export type HeaderKeys = (keyof Data)[];
export type ActiveFilter = keyof Data | "";

export interface TableData {
  headerKeys: HeaderKeys;
  data: Data[];
  orderByKey: OrderByKey;
  reset: Reset;
  activeFilter: ActiveFilter;
  findDuplicates: FindDuplicates;
  search: Search;
}

interface TableState {
  data: Data[];
  activeFilter: ActiveFilter;
  activeOrderIsAsc: boolean;
  activeDuplicateFilter: ActiveFilter;
}

interface ResetAction {
  type: typeof RESET_ORDER;
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
interface RefreshAction {
  type: typeof REFRESH_DATA;
  payload: { data: Data[] };
}

export type ReducerAction =
  | ResetAction
  | OrderAction
  | FilterDuplicatesAction
  | SearchAction
  | RefreshAction;

export const initState: (data: Data[]) => TableState = (initialData) => {
  return {
    data: initialData,
    activeFilter: "",
    activeOrderIsAsc: true,
    activeDuplicateFilter: "",
  };
};

const orderData: (
  array: Data[],
  filter: keyof Data,
  isAsc: boolean
) => Data[] = (array, filter, isAsc) =>
  array.sort((a, b) => innerSort(a, b, filter, isAsc));

const filterDuplicates: (data: Data[], key: keyof Data) => Data[] = (
  data,
  key
) => {
  const keyValues: string[] = data.map((element) => element[key]);

  return data.filter((element, index) => {
    if (keyValues.indexOf(element[key], index + 1) > -1) {
      return element;
    }

    // for the last item compare with previous values
    if (index === data.length - 1) {
      if (keyValues.indexOf(element[key]) !== index) {
        return element;
      }
    }
  });
};

export const tableDataReducer: React.Reducer<TableState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case REFRESH_DATA:
      let finalData;

      if (state.activeDuplicateFilter) {
        finalData = filterDuplicates(
          action.payload.data,
          state.activeDuplicateFilter
        );
      }

      if (state.activeFilter) {
        finalData = orderData(
          action.payload.data,
          state.activeFilter,
          state.activeOrderIsAsc
        );
      }

      return {
        ...state,
        data: finalData || action.payload.data,
      };
    case ORDER:
      return {
        ...state,
        data: orderData(
          [...state.data],
          action.payload.key,
          action.payload.isAsc
        ),
        activeFilter: action.payload.key,
        activeOrderIsAsc: action.payload.isAsc,
      };
    case FILTER_DUPLICATES:
      if (!action.payload.key) {
        return {
          ...state,
          activeDuplicateFilter: "",
          data: action.payload.data,
        };
      }

      const duplicatesArray = filterDuplicates(
        action.payload.data,
        action.payload.key
      );

      if (state.activeFilter) {
        return {
          ...state,
          activeDuplicateFilter: action.payload.key,
          data: orderData(
            [...duplicatesArray],
            state.activeFilter,
            state.activeOrderIsAsc
          ),
        };
      }

      return {
        ...state,
        activeDuplicateFilter: action.payload.key,
        data: duplicatesArray,
      };
    case SEARCH:
      if (!action.payload.keyword) {
        return {
          ...state,
          data: action.payload.data,
        };
      }

      const searchResults = state.data.filter((el) =>
        el.url.includes(action.payload.keyword)
      );

      if (state.activeFilter) {
        return {
          ...state,
          data: [...searchResults].sort((a, b) =>
            innerSort(a, b, state.activeFilter, state.activeOrderIsAsc)
          ),
        };
      }

      return {
        ...state,
        data: searchResults,
      };
    case RESET_ORDER:
      if (!state.activeDuplicateFilter) {
        return initState(action.payload.data);
      }

      return {
        ...state,
        activeFilter: "",
        activeOrderIsAsc: true,
        data: filterDuplicates(
          action.payload.data,
          state.activeDuplicateFilter
        ),
      };
    default:
      return state;
  }
};
