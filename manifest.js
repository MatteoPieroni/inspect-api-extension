const manifest = {
  "manifest_version": 2,

  "name": "Inspect API calls",
  "description": "Inspect API calls extension",
  "version": "0.0.1",

  "browser_action": {
    "default_popup": "index.html",
    "default_title": "Open the popup"
  },
  "background": {
    "scripts": ["background.js"]
  },
  "icons": {},
  "permissions": ["webRequest", "webNavigation", "<all_urls>", "storage"]
}

module.exports = manifest;