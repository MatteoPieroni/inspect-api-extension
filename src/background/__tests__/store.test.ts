import { Store } from "../store";
import { entry, updatedEntry } from "../utils/mockData";

describe("Store", () => {
  let store: Store;
  const previousConsole = console.log;

  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = previousConsole;
  });

  describe("data store", () => {
    beforeEach(() => {
      store = new Store();
    });

    test("it initialises with an empty store", () => {
      expect(store.get()).toEqual({});
    });

    test("it allows adding data", () => {
      store.add("test", entry);
      expect(store.get()).toEqual({
        test: entry,
      });
    });

    test("it does not add data when the data id is already in the store", () => {
      store.add("test", entry);

      store.add("test", {
        ...entry,
        status: "complete",
      });

      expect(store.get()).toEqual({
        test: entry,
      });
    });

    test("it allows updating data", () => {
      store.add("test", entry);
      store.update("test", {
        endTime: 123456789.1,
        status: "complete",
      });

      expect(store.get()).toEqual({
        test: updatedEntry,
      });
    });

    test("it does not update data when the data id is not in the store", () => {
      store.add("test", entry);

      store.update("test-fake", {
        endTime: 123456789.1,
        status: "complete",
      });

      expect(store.get()).toEqual({
        test: entry,
      });
    });

    test("it allows resetting data", () => {
      store.add("test", entry);
      store.reset();

      expect(store.get()).toEqual({});
    });
  });

  describe("observer", () => {
    beforeEach(() => {
      store = new Store();
    });

    test("it updates with data when first subscribing", () => {
      const subscriber = jest.fn();

      store.add("test", entry);
      store.subscribe(subscriber);

      expect(subscriber).toHaveBeenCalledWith({ test: entry });
    });

    test("it updates with data when the store emits", () => {
      const subscriber = jest.fn();

      store.add("test", entry);
      store.subscribe(subscriber);

      subscriber.mockRestore();

      store.emit();

      expect(subscriber).toHaveBeenCalledWith({ test: entry });
    });
  });

  describe("integration between data and observer", () => {
    let subscriber: jest.Mock;

    beforeEach(() => {
      store = new Store();
      subscriber = jest.fn();
    });

    afterEach(() => {
      subscriber.mockRestore();
    });

    test("it updates subscribers with data when it gets added", () => {
      store.subscribe(subscriber);
      store.add("test", entry);

      expect(subscriber).toHaveBeenCalledWith({ test: entry });
    });

    test("it updates subscribers with data when it gets updated", () => {
      store.subscribe(subscriber);
      store.add("test", entry);

      subscriber.mockRestore();

      store.update("test", {
        endTime: 123456789.1,
        status: "complete",
      });

      expect(subscriber).toHaveBeenCalledWith({ test: updatedEntry });
    });

    test("it does not update subscribers with data when it gets updated and the data is not in the store", () => {
      store.subscribe(subscriber);
      store.add("test", entry);

      subscriber.mockRestore();

      store.update("test-fake", {
        endTime: 123456789.1,
        status: "complete",
      });

      expect(subscriber).not.toHaveBeenCalled();
    });
  });
});
