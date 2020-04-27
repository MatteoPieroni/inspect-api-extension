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
  "icons": {
    "48": "Icon48.png",
    "128": "Icon128.png" 
  },
  "permissions": ["webRequest", "webNavigation", "<all_urls>"]
}

module.exports = manifest;