import { Store } from "../store";

describe("Store", () => {
  test("it initialises with an empty store", () => {
    const store = new Store();

    expect(store.get()).toEqual({});
  });
});
