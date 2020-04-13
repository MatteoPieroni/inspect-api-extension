import { Entry } from "../store";

export const entry: Entry = {
  id: "test",
  method: "GET",
  status: "pending",
  url: "https://test.com",
  startTime: 123456789.0,
};

export const updatedEntry: Entry = {
  id: "test",
  method: "GET",
  status: "complete",
  url: "https://test.com",
  startTime: 123456789.0,
  endTime: 123456789.1,
};
