import { Data } from "../../types";
import { StateFilter, RegexPayload } from "./tableReducers";

export const REGEX = "REGEX";
export const DUPLICATES = "DUPLICATES";

export enum Filters {
  REGEX,
  DUPLICATES,
}

interface RegexSettings {
  pattern?: RegExp | "";
  key?: keyof Data | "";
}
export interface DuplicatesSettings {
  key: keyof Data | "";
}

export type ApplyFiltersSettings = RegexSettings | DuplicatesSettings;

const filterDuplicates: (data: Data[], key: keyof Data) => Data[] = (
  data,
  key
) => {
  const keyValues: string[] = data.map((element) => element[key]);

  let duplicatesArray: Data[] = [];

  data.forEach((element, index) => {
    // if the data is present in the rest of the array add it
    if (keyValues.indexOf(element[key], index + 1) > -1) {
      return duplicatesArray.push(element);
    }

    // if data is present already in the duplicate array add it
    if (
      duplicatesArray.find(
        (duplicateElement) => duplicateElement[key] === element[key]
      )
    ) {
      return duplicatesArray.push(element);
    }
  });

  return duplicatesArray;
};

const matchRegex: (
  data: Data[],
  pattern: RegExp,
  key?: keyof Data
) => Data[] = (data, pattern, key = "url") =>
  data.filter((el) => el[key].match(pattern));

interface applyFilters {
  filters: (keyof typeof Filters)[];
  data: Data[];
  filterSettings: ApplyFiltersSettings;
}

export const applyFilters: (filters: StateFilter[], data: Data[]) => Data[] = (
  filters,
  data
) =>
  filters.reduce((aggData, filter) => {
    if (filter[0] === DUPLICATES && filter[1].key) {
      return filterDuplicates(aggData, filter[1].key);
    }

    const regexFilter = filter as [typeof REGEX, RegexSettings, string];

    if (filter[0] === REGEX && regexFilter[1].pattern) {
      return matchRegex(
        aggData,
        regexFilter[1].pattern,
        filter[1].key || undefined
      );
    }

    return aggData;
  }, data);
