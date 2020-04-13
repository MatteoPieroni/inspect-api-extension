import { Methods } from "../types";
import { Store, StoreData } from "./store";

const networkFilters = {
  urls: ["<all_urls>"],
};

const setListeners: (tabId: number | undefined, tabStorage: Store) => void = (
  tabId,
  tabStorage
) => {
  chrome.webRequest.onBeforeRequest.addListener((details) => {
    const { tabId: requestTabId, requestId, type, method } = details;

    if (requestTabId !== tabId || type !== "xmlhttprequest") {
      return;
    }

    tabStorage.add(requestId, {
      id: requestId,
      url: details.url,
      startTime: details.timeStamp,
      status: "pending",
      method: method as keyof typeof Methods,
    });
  }, networkFilters);

  chrome.webRequest.onCompleted.addListener((details) => {
    const { tabId: requestTabId, requestId, type } = details;

    if (requestTabId !== tabId || type !== "xmlhttprequest") {
      return;
    }

    tabStorage.update(requestId, {
      endTime: details.timeStamp,
      status: "complete",
    });
  }, networkFilters);

  chrome.webRequest.onErrorOccurred.addListener((details): void => {
    const { tabId: requestTabId, requestId, type } = details;

    if (requestTabId !== tabId || type !== "xmlhttprequest") {
      return;
    }

    tabStorage.update(requestId, {
      endTime: details.timeStamp,
      status: "error",
    });
  }, networkFilters);
};

const sendMessage = (data: StoreData): void => {
  chrome.runtime.sendMessage(undefined, data);
};

(function () {
  chrome.tabs.onCreated.addListener((tab) => {
    const tabStorage = new Store();
    const tabId = tab && tab.id;

    setListeners(tabId, tabStorage);

    chrome.runtime.onConnect.addListener(() => {
      console.log("connected");

      tabStorage.subscribe((data) => {
        sendMessage(data);
      });
    });

    chrome.webNavigation.onBeforeNavigate.addListener((navigatedTab) => {
      const navigatedTabId = navigatedTab && navigatedTab.parentFrameId;

      if (navigatedTabId === tabId) {
        console.log("resetting");
        tabStorage.reset();
      }
    });
  });
})();

console.log("working");
