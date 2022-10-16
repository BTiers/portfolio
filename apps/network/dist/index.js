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
  Network: () => Network,
  NetworkDescription: () => NetworkDescription,
  NetworkIcon: () => NetworkIcon,
  NetworkLabel: () => NetworkLabel
});
module.exports = __toCommonJS(src_exports);

// src/Network.tsx
var import_react = require("react");
var import_react_use = require("react-use");
var import_ai = require("react-icons/ai");
var import_fa = require("react-icons/fa");
var import_classnames = __toESM(require("classnames"));
var import_jsx_runtime = require("react/jsx-runtime");
var Network = (0, import_react.memo)(() => {
  const { online } = (0, import_react_use.useNetworkState)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    children: online ? "Connected" : "Disconnected"
  });
});
var NetworkLabel = (0, import_react.memo)(() => {
  const { online } = (0, import_react_use.useNetworkState)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    children: online ? "Connected" : "Disconnected"
  });
});
var NetworkDescription = (0, import_react.memo)(() => {
  const { type, effectiveType, downlink } = (0, import_react_use.useNetworkState)();
  console.log(downlink);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-col w-48 space-y-1.5",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex justify-between space-x-1 font-medium",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "text-xs text-gray-400",
            children: "Connection type :"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            className: "text-xs text-gray-200",
            children: [
              type === "wifi" && "Wifi",
              type === "ethernet" && "Ethernet",
              effectiveType
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex justify-between space-x-1 font-medium",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "text-xs text-gray-400",
            children: "Download speed :"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            className: "text-xs text-gray-200",
            children: [
              downlink,
              " mb/s"
            ]
          })
        ]
      })
    ]
  });
});
var NetworkIcon = (0, import_react.memo)(({ className }) => {
  const { online, type } = (0, import_react_use.useNetworkState)();
  if (!online)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineDisconnect, {
      className: (0, import_classnames.default)("text-gray-100", className)
    });
  if (type === "wifi")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineWifi, {
      className: (0, import_classnames.default)("text-gray-100", className)
    });
  if (type === "ethernet")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaEthernet, {
      className: (0, import_classnames.default)("text-gray-100", className)
    });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineWifi, {
    className: (0, import_classnames.default)("text-gray-100", className)
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Network,
  NetworkDescription,
  NetworkIcon,
  NetworkLabel
});
