/* eslint-disable no-undef */
class Store {
  constructor() {
    this._store = {};
    this._listeners = [];
  }

  subscribe(listener) {
    console.log('subscribed');
    this._listeners.push(listener);
    
    listener(this.get());
  }
  
  emit() {
    console.log('emitting');
    this._listeners.forEach(listener => {
      if (typeof listener === 'function') {
        listener(this.get());
      }
    })
  }

  get() {
    return this._store;
  }

  add(id, entry) {
    const existingEntry = !!this._store[id];

    if (existingEntry) {
      return;
    }

    this._store[id] = entry;

    this.emit(JSON.stringify(this.get()));
  }

  update(id, entry) {
    const existingEntry = !!this._store[id];

    if (!existingEntry) {
      return;
    }

    this._store[id] = {
      ...this._store[id],
      ...entry,
    }

    this.emit(JSON.stringify(this.get()));
  }

  reset() {
    this._store = {};
    this._listeners = [];

    this.emit(JSON.stringify({}));
  }
}

const networkFilters = {
    urls: [
      "<all_urls>"
    ]
};

const setListeners = (tabId, tabStorage) => {
  chrome.webRequest.onBeforeRequest.addListener((details) => {
    const { requestTabId, requestId, type, method } = details;

    if (requestTabId !== tabId || type !== "xmlhttprequest") {
      return;
    }

    tabStorage.add(requestId, {
      id: requestId,
      url: details.url,
      startTime: details.timeStamp,
      status: 'pending',
      method,
    });
  }, networkFilters);

  chrome.webRequest.onCompleted.addListener((details) => {
      const { requestTabId, requestId, type } = details;

      if (requestTabId !== tabId || type !== "xmlhttprequest") {
        return;
      }

      tabStorage.update(requestId, {
          endTime: details.timeStamp,
          status: 'complete'
      });
  }, networkFilters);

  chrome.webRequest.onErrorOccurred.addListener((details)=> {
      const { requestTabId, requestId, type } = details;

      if (requestTabId !== tabId || type !== "xmlhttprequest") {
        return;
      }

      tabStorage.update(requestId, {
          endTime: details.timeStamp,
          status: 'error'
      });
  }, networkFilters);
}

const sendMessage = (data) => {
  chrome.runtime.sendMessage(undefined, data);
}

(function() {
  chrome.tabs.onCreated.addListener((tab) => {
    const tabStorage = new Store();
    const tabId = tab && tab.tabId;
    
    setListeners(tabId, tabStorage);

    chrome.runtime.onConnect.addListener(() => {
      console.log('connected');

      tabStorage.subscribe((data) => {
        sendMessage(data)
      })
    })

    chrome.webNavigation.onBeforeNavigate.addListener((navigatedTab) => {
      const navigatedTabId = navigatedTab && navigatedTab.id;

      if (navigatedTabId === tabId) {
        console.log('resetting')
        tabStorage.reset();
      }
    });
  })
}());

console.log('working')
