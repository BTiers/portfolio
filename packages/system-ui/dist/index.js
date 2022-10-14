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
  HoverCard: () => HoverCard,
  HoverCardRoot: () => HoverCardRoot,
  HoverCardTrigger: () => HoverCardTrigger,
  Popover: () => Popover,
  PopoverRoot: () => PopoverRoot,
  PopoverTrigger: () => PopoverTrigger
});
module.exports = __toCommonJS(src_exports);

// src/components/HoverCard.tsx
var RadixHoverCard = __toESM(require("@radix-ui/react-hover-card"));
var import_jsx_runtime = require("react/jsx-runtime");
var HoverCardTrigger = ({ ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixHoverCard.Trigger, {
    ...props
  });
};
var HoverCardRoot = RadixHoverCard.Root;
var HoverCard = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadixHoverCard.Content, {
    align: "center",
    sideOffset: 4,
    className: "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down max-w-sm ml-1 mr-3 rounded-md p-4 bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixHoverCard.Arrow, {
        className: "fill-current text-gray-800"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "flex h-full w-full space-x-4",
        children
      })
    ]
  });
};

// src/components/Popover.tsx
var RadixPopover = __toESM(require("@radix-ui/react-popover"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var PopoverTrigger = ({
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RadixPopover.Trigger, {
    ...props
  });
};
var PopoverRoot = RadixPopover.Root;
var Popover = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(RadixPopover.Content, {
    align: "center",
    sideOffset: 4,
    className: "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down rounded-md p-4 mx-4 shadow-md bg-gray-800",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RadixPopover.Arrow, {
        className: "fill-current text-gray-800"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
        className: "flex h-full w-full space-x-4",
        children
      })
    ]
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HoverCard,
  HoverCardRoot,
  HoverCardTrigger,
  Popover,
  PopoverRoot,
  PopoverTrigger
});
