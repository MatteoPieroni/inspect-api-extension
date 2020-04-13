export enum Statuses {
  "pending",
  "complete",
  "error",
}

export enum Methods {
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
}

export interface Data {
  id: string;
  url: string;
  duration: string;
  status: keyof typeof Statuses;
  method: keyof typeof Methods;
}

export interface RawData {
  id: string;
  url: string;
  startTime: number;
  endTime?: number;
  status: keyof typeof Statuses;
  method: keyof typeof Methods;
}

export interface DataCollection {
  [key: string]: RawData;
}

export interface GenericObject {
  [key: string]: any;
}
