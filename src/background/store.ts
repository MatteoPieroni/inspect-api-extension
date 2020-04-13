import { Statuses, Methods } from "../types";

export interface StoreData {
  [id: string]: Entry;
}

type PartEntry = {
  endTime: number;
  status?: keyof typeof Statuses;
};

type Entry = {
  id: string;
  url: string;
  startTime: number;
  endTime?: number;
  status: keyof typeof Statuses;
  method: keyof typeof Methods;
};

type Listener = (data: StoreData) => void;

export class Store {
  _store: StoreData;

  _listeners: Listener[];

  constructor() {
    this._store = {};
    this._listeners = [];
  }

  subscribe(listener: Listener): void {
    console.log("subscribed");
    this._listeners.push(listener);

    listener(this.get());
  }

  emit(): void {
    console.log("emitting");
    this._listeners.forEach((listener) => {
      if (typeof listener === "function") {
        listener(this.get());
      }
    });
  }

  get(): StoreData {
    return this._store;
  }

  add(id: string, entry: Entry): void {
    const existingEntry = !!this._store[id];

    if (existingEntry) {
      return;
    }

    this._store[id] = entry;

    this.emit();
  }

  update(id: string, entry: PartEntry): void {
    const existingEntry = !!this._store[id];

    if (!existingEntry) {
      return;
    }

    this._store[id] = {
      ...this._store[id],
      ...entry,
    };

    this.emit();
  }

  reset(): void {
    this._store = {};
    this._listeners = [];

    this.emit();
  }
}
