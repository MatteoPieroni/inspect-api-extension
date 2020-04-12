import { Data } from "../../types";

export type OrderByKey = (key: keyof Data, isAsc: boolean | undefined) => void;
export type FindDuplicates = (
  key: keyof Data | undefined,
  identifier: string
) => void;
export type Search = (keyword: string) => void;
export type Reset = () => void;
export type Regex = (
  pattern: RegExp | "",
  identifier: string,
  key?: keyof Data
) => void;
