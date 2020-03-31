import { Data, DataCollection } from "../types";

export const normaliseData: (
  arrayOfValues: DataCollection
) => Data[] | undefined = arrayOfValues => {
  if (!(Object.values(arrayOfValues).length >= 0)) {
    console.error(`The passed in value was not formatted correctly`);

    return;
  }

  return Object.values(arrayOfValues).map(
    ({ startTime, endTime, ...rest }) => ({
      ...rest,
      duration: endTime ? ((endTime - startTime) / 1000).toFixed(2) : ""
    })
  );
};
