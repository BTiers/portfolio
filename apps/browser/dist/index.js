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
  Browser: () => Browser,
  BrowserIcon: () => BrowserIcon
});
module.exports = __toCommonJS(src_exports);

// src/Browser.tsx
var import_react = require("react");
var import_classnames = __toESM(require("classnames"));
var import_react_use = require("react-use");
var import_ai = require("react-icons/ai");
var import_fa = require("react-icons/fa");
var import_si = require("react-icons/si");
var import_jsx_runtime = require("react/jsx-runtime");
var SuggestionButton = ({ icon, title, onClick }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
    onClick,
    className: "flex flex-col items-center p-2 space-y-2 rounded-md hover:bg-gray-700",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full",
        children: icon
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "text-sm font-semibold text-gray-100",
        children: title
      })
    ]
  });
};
var DEFAULT_TAB_STATE = {
  url: "",
  prev: [],
  next: [],
  active: true,
  ref: null
};
var Browser = (0, import_react.memo)(({ id }) => {
  var _a, _b;
  const [tabs, setTabs] = (0, import_react.useState)([{ ...DEFAULT_TAB_STATE }]);
  const urlInputRef = (0, import_react.useRef)(null);
  (0, import_react_use.useKeyPressEvent)(
    "Enter",
    (0, import_react.useCallback)(() => {
      if (urlInputRef == null ? void 0 : urlInputRef.current)
        setTabs(
          (tabs2) => tabs2.map((tab) => {
            var _a2;
            if (tab.active === true)
              return {
                ...tab,
                prev: [...tab.prev, tab.url],
                url: ((_a2 = urlInputRef == null ? void 0 : urlInputRef.current) == null ? void 0 : _a2.value) || ""
              };
            return tab;
          })
        );
    }, [urlInputRef])
  );
  const setActiveTab = (0, import_react.useCallback)((index) => {
    setTabs(
      (tabs2) => tabs2.map((tab, tabIndex) => {
        if (tabIndex === index) {
          if (urlInputRef == null ? void 0 : urlInputRef.current)
            urlInputRef.current.value = tab.url;
          return { ...tab, active: true };
        }
        return { ...tab, active: false };
      })
    );
  }, []);
  const removeTab = (0, import_react.useCallback)((index) => {
    setTabs((tabs2) => {
      const tabsCpy = [...tabs2];
      if (tabsCpy[index].active) {
        if (tabsCpy.length > index + 1)
          tabsCpy[index + 1].active = true;
        else if (index - 1 >= 0)
          tabsCpy[index - 1].active = true;
      }
      tabsCpy.splice(index, 1);
      return tabsCpy.length === 0 ? [{ ...DEFAULT_TAB_STATE }] : tabsCpy;
    });
  }, []);
  const createTab = (0, import_react.useCallback)(() => {
    setTabs((tabs2) => [
      ...tabs2.map((tab) => ({ ...tab, active: false })),
      { ...DEFAULT_TAB_STATE }
    ]);
  }, []);
  const setUrlToActiveTab = (0, import_react.useCallback)((url) => {
    setTabs(
      (tabs2) => tabs2.map((tab) => {
        if (tab.active === true) {
          if (urlInputRef == null ? void 0 : urlInputRef.current)
            urlInputRef.current.value = url;
          return { ...tab, prev: [...tab.prev, tab.url], url };
        }
        return { ...tab };
      })
    );
  }, []);
  const goBack = (0, import_react.useCallback)(() => {
    setTabs(
      (tabs2) => tabs2.map((tab) => {
        if (tab.active === true && tab.prev.length > 0) {
          const prevCopy = [...tab.prev];
          const nextCopy = [...tab.next];
          const nextUrl = prevCopy.pop() || "";
          nextCopy.push(tab.url);
          if (urlInputRef == null ? void 0 : urlInputRef.current)
            urlInputRef.current.value = nextUrl;
          return {
            ...tab,
            prev: [...prevCopy],
            next: [...nextCopy],
            url: nextUrl
          };
        }
        return { ...tab };
      })
    );
  }, []);
  const goForward = (0, import_react.useCallback)(() => {
    setTabs(
      (tabs2) => tabs2.map((tab) => {
        if (tab.active === true && tab.next.length > 0) {
          const prevCopy = [...tab.prev];
          const nextCopy = [...tab.next];
          const nextUrl = nextCopy.pop() || "";
          prevCopy.push(tab.url);
          if (urlInputRef == null ? void 0 : urlInputRef.current)
            urlInputRef.current.value = nextUrl;
          return {
            ...tab,
            prev: [...prevCopy],
            next: [...nextCopy],
            url: nextUrl
          };
        }
        return { ...tab };
      })
    );
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "relative flex flex-col flex-grow rounded-b-md",
    id,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex w-full h-10 px-3 bg-gray-900",
        children: [
          tabs.map(({ ref, active, url, prev, next }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: `flex items-center overflow-hidden justify-between mt-2 w-full max-w-[16rem] px-2 text-xs text-gray-100 rounded-t-md hover:bg-gray-800 ${active ? "bg-gray-800" : "border-r border-gray-800"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                className: "flex items-center flex-grow h-8 min-w-0 space-x-2",
                onClick: () => setActiveTab(index),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "flex-shrink-0",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiFillCloud, {})
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "flex-shrink truncate",
                    children: !url ? "New tab" : url
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                onClick: () => removeTab(index),
                className: "flex items-center flex-shrink-0 rounded-full hover:bg-gray-600 p-0.5   ",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineClose, {})
              })
            ]
          }, index)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onClick: () => createTab(),
            className: "flex items-center self-center justify-center w-5 h-5 mt-2 ml-2 text-gray-100 rounded-full hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlinePlus, {})
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex items-center w-full h-10 px-4 space-x-2 bg-gray-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onClick: goBack,
            disabled: ((_a = tabs.find(({ active }) => active)) == null ? void 0 : _a.prev.length) === 0,
            className: "flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full disabled:hover:bg-gray-800 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:hover:cursor-default hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineArrowLeft, {})
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onClick: goForward,
            disabled: ((_b = tabs.find(({ active }) => active)) == null ? void 0 : _b.next.length) === 0,
            className: "flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full disabled:hover:bg-gray-800 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:hover:cursor-default hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineArrowRight, {})
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            className: "flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineReload, {})
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
            ref: urlInputRef,
            className: "flex-grow px-4 py-1 text-sm text-gray-100 bg-gray-900 rounded-full outline-none focus:border-0 focus:ring-2 focus:ring-blue-300"
          })
        ]
      }),
      tabs.map(
        ({ url, active }, index) => !!url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
          ref: (ref) => {
            if (!tabs[index].ref)
              setTabs((tabs2) => {
                const tabsCpy = [...tabs2];
                tabsCpy[index].ref = ref;
                return tabsCpy;
              });
          },
          referrerPolicy: "no-referrer-when-downgrade",
          src: `https://www.google.com/search?q=${url}&igu=1`,
          style: {
            zIndex: active ? 1 : 0,
            top: "5rem",
            height: "calc(100% - 5rem)"
          },
          className: "absolute left-0 w-full rounded-b-md"
        }, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          style: {
            zIndex: active ? 1 : 0,
            top: "5rem",
            height: "calc(100% - 5rem)"
          },
          className: "absolute left-0 flex flex-col items-center justify-center w-full overflow-hidden bg-gray-900 rounded-b-md",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "grid flex-shrink-0 grid-cols-4 mx-auto gap-y-8 gap-x-12",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.github.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiFillGithub, {
                  className: "w-8 h-8 text-white rounded-full"
                }),
                title: "Github"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_fa.FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              })
            ]
          })
        }, index)
      )
    ]
  });
});
var BrowserIcon = (0, import_react.memo)(({ className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: (0, import_classnames.default)("relative", className),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: (0, import_classnames.default)(
          "top-0 left-0 translate-x-[25%] translate-y-[21%] w-[67%] h-[66%] absolute bg-white rounded-b-lg",
          className
        )
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_si.SiBrave, {
        className: (0, import_classnames.default)("absolute text-orange-500", className)
      })
    ]
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Browser,
  BrowserIcon
});
