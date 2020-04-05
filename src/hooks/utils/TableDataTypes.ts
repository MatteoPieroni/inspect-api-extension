import { Data } from "../../types";

export type OrderByKey = (key: keyof Data, isAsc: boolean | undefined) => void;
export type FindDuplicates = (key: keyof Data | undefined) => void;
export type Search = (keyword: string) => void;
export type Reset = () => void;