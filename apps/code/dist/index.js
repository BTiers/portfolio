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
var import_hi = require("react-icons/hi");
var import_jsx_runtime = require("react/jsx-runtime");
var Code = (0, import_react.memo)(({}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "relative flex flex-col flex-grow rounded-b-md",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
      src: "https://github1s.com/react-hook-form/react-hook-form",
      frameBorder: "0",
      allow: "encrypted-media",
      className: "absolute left-0 w-full h-full rounded-b-md"
    })
  });
});
var CodeIcon = (0, import_react.memo)(({ className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_hi.HiCode, {
    className: (0, import_classnames.default)("text-blue-500", className)
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Code,
  CodeIcon
});
