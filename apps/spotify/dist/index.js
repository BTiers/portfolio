"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Spotify: () => Spotify,
  SpotifyIcon: () => SpotifyIcon
});
module.exports = __toCommonJS(src_exports);

// src/Spotify.tsx
var import_react = require("react");
var import_classnames = __toESM(require("classnames"));
var import_si = require("react-icons/si");
var import_jsx_runtime = require("react/jsx-runtime");
var Spotify = (0, import_react.memo)(({ id }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "relative flex flex-col flex-grow",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
      id,
      src: "https://open.spotify.com/embed/album/4gyRYbpN8MSXuS2zPwcjQu?utm_source=generator",
      frameBorder: "0",
      allow: "encrypted-media",
      className: "absolute left-0 w-full h-full"
    })
  });
});
var SpotifyIcon = (0, import_react.memo)(({ className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_si.SiSpotify, {
    className: (0, import_classnames.default)("text-[#1db954]", className)
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Spotify,
  SpotifyIcon
});
