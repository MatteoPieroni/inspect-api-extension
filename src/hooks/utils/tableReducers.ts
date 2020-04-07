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
export type ActiveSearch = string;

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
    activeSearch: "",
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
      return true;
    }

    // for the last item compare with previous values
    if (index === data.length - 1) {
      if (keyValues.indexOf(element[key]) !== index) {
        return true;
      }
    }

    return false;
  });
};

const search: (data: Data[], keyword: string) => Data[] = (data, keyword) =>
  data.filter((el) => el.url.includes(keyword));

const dataFlow: (state: TableState, data?: Data[]) => Data[] = (
  state,
  data
) => {
  const {
    data: stateData,
    activeFilter,
    activeOrderIsAsc,
    activeDuplicateFilter,
    activeSearch,
  } = state;
  let finalData = (data && data.length > 0 && data) || stateData;

  // search
  if (activeSearch) {
    finalData = search(finalData, activeSearch);
  }

  // order
  if (activeFilter) {
    finalData = orderData(finalData, activeFilter, activeOrderIsAsc);
  }

  // filter duplicates
  if (activeDuplicateFilter) {
    finalData = filterDuplicates(finalData, activeDuplicateFilter);
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
        activeFilter: action.payload.key,
        activeOrderIsAsc: action.payload.isAsc,
      };

    case FILTER_DUPLICATES:
      let duplicateState = state;

      if (!action.payload.key) {
        duplicateState = {
          ...duplicateState,
          activeDuplicateFilter: "",
        };
      } else {
        duplicateState = {
          ...duplicateState,
          activeDuplicateFilter: action.payload.key,
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
      // no duplicateFilter && no activeSearch
      if (!state.activeDuplicateFilter && !state.activeSearch) {
        return initState(action.payload.data);
      }

      const resetOrderState = {
        ...state,
        activeFilter: "" as "",
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
