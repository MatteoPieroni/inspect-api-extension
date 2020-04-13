import sinonChrome from "sinon-chrome";

import { initScript, newTabListener, setListeners } from "../backgroundScripts";
import { Store } from "../store";
import { fakeTab, entry } from "../utils/mockData";

export interface Global {
  chrome: any;
}

declare var global: Global;

const setGlobalChrome = () => {
  global.chrome = sinonChrome;
};

describe("background script", () => {
  describe("initScript", () => {
    test("adds a listener when creating a new tab", () => {
      setGlobalChrome();
      chrome.tabs.onCreated.addListener = jest.fn();
      initScript();

      expect(chrome.tabs.onCreated.addListener).toHaveBeenCalled();
    });
  });

  describe("newTabListener", () => {
    test("adds a listener when connecting and one when moving away from the page", () => {
      setGlobalChrome();
      chrome.runtime.onConnect.addListener = jest.fn();
      chrome.webNavigation.onBeforeNavigate.addListener = jest.fn();

      newTabListener(fakeTab, jest.fn());

      expect(chrome.runtime.onConnect.addListener).toHaveBeenCalledTimes(1);
      expect(
        chrome.webNavigation.onBeforeNavigate.addListener
      ).toHaveBeenCalledTimes(1);
    });

    test("it calls the listener init function when creating the tab listener", () => {
      setGlobalChrome();
      const passedListener = jest.fn();

      newTabListener(fakeTab, passedListener);

      expect(passedListener).toHaveBeenCalledTimes(1);
    });
  });

  describe("setListeners", () => {
    test("adds listeners to requests started, completed or errored", () => {
      setGlobalChrome();
      chrome.webRequest.onBeforeRequest.addListener = jest.fn();
      chrome.webRequest.onCompleted.addListener = jest.fn();
      chrome.webRequest.onErrorOccurred.addListener = jest.fn();

      setListeners(undefined, {} as Store);

      expect(
        chrome.webRequest.onBeforeRequest.addListener
      ).toHaveBeenCalledTimes(1);
      expect(chrome.webRequest.onCompleted.addListener).toHaveBeenCalledTimes(
        1
      );
      expect(
        chrome.webRequest.onErrorOccurred.addListener
      ).toHaveBeenCalledTimes(1);
    });
  });
});
