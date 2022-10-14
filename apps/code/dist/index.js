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
  Code: () => Code,
  CodeIcon: () => CodeIcon
});
module.exports = __toCommonJS(src_exports);

// src/Code.tsx
var import_react = require("react");
var import_classnames = __toESM(require("classnames"));
var import_jsx_runtime = require("react/jsx-runtime");
var Code = (0, import_react.memo)(({ id }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "relative flex flex-col flex-grow rounded-b-md",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
      id,
      src: "https://github1s.com/react-hook-form/react-hook-form",
      frameBorder: "0",
      allow: "encrypted-media",
      className: "absolute left-0 w-full h-full rounded-b-md"
    })
  });
});
var CodeIcon = (0, import_react.memo)(({ className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: (0, import_classnames.default)("text-blue-500", className),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
        d: "M29.01 5.03l-5.766-2.776a1.742 1.742 0 00-1.989.338L2.38 19.8a1.166 1.166 0 00-.08 1.647c.025.027.05.053.077.077l1.541 1.4a1.165 1.165 0 001.489.066L28.142 5.75A1.158 1.158 0 0130 6.672v-.067a1.748 1.748 0 00-.99-1.575z",
        fill: "#0065a9"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
        d: "M29.01 26.97l-5.766 2.777a1.745 1.745 0 01-1.989-.338L2.38 12.2a1.166 1.166 0 01-.08-1.647c.025-.027.05-.053.077-.077l1.541-1.4A1.165 1.165 0 015.41 9.01l22.732 17.24A1.158 1.158 0 0030 25.328v.072a1.749 1.749 0 01-.99 1.57z",
        fill: "#007acc"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
        d: "M23.244 29.747a1.745 1.745 0 01-1.989-.338A1.025 1.025 0 0023 28.684V3.316a1.024 1.024 0 00-1.749-.724 1.744 1.744 0 011.989-.339l5.765 2.772A1.748 1.748 0 0130 6.6v18.8a1.748 1.748 0 01-.991 1.576z",
        fill: "#1f9cf0"
      })
    ]
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Code,
  CodeIcon
});
