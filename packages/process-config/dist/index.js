"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AvailableProcessesArray: () => AvailableProcessesArray,
  config: () => config
});
module.exports = __toCommonJS(src_exports);
var import_spotify = require("@sysfolio/spotify");
var import_code = require("@sysfolio/code");
var import_browser = require("@sysfolio/browser");
var import_network = require("@sysfolio/network");
var import_calendar = require("@sysfolio/calendar");
var AvailableProcessesArray = [
  "spotify",
  "code",
  "calendar",
  "browser",
  "network"
];
var config = [
  {
    type: "spotify",
    renderer: "window",
    name: "Spotify",
    description: "A Spotify web player inside of an IFrame",
    icon: import_spotify.SpotifyIcon,
    root: import_spotify.Spotify
  },
  {
    type: "code",
    renderer: "window",
    name: "Code",
    description: "A Github1s instance inside of an IFrame",
    icon: import_code.CodeIcon,
    root: import_code.Code
  },
  {
    type: "browser",
    renderer: "window",
    name: "Brave",
    description: "A poorly featured Brave browser",
    icon: import_browser.BrowserIcon,
    root: import_browser.Browser
  },
  {
    type: "network",
    renderer: "popover",
    name: "Network",
    dynamicName: import_network.NetworkLabel,
    description: "Informations about the network",
    dynamicDescription: import_network.NetworkDescription,
    icon: import_network.NetworkIcon,
    root: import_network.Network
  },
  {
    type: "calendar",
    renderer: "popover",
    name: "Calendar",
    dynamicName: import_calendar.CalendarLabel,
    description: "A basic calendar",
    dynamicDescription: import_calendar.CalendarDescription,
    icon: void 0,
    root: import_calendar.Calendar
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvailableProcessesArray,
  config
});
