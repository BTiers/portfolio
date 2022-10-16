// src/Browser.tsx
import { useRef, useState, useCallback, memo } from "react";
import classNames from "classnames";
import { useKeyPressEvent } from "react-use";
import {
  AiFillCloud,
  AiFillGithub,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineReload
} from "react-icons/ai";
import { FaStackOverflow } from "react-icons/fa";
import { SiBrave } from "react-icons/si";
import { jsx, jsxs } from "react/jsx-runtime";
var SuggestionButton = ({ icon, title, onClick }) => {
  return /* @__PURE__ */ jsxs("button", {
    onClick,
    className: "flex flex-col items-center p-2 space-y-2 rounded-md hover:bg-gray-700",
    children: [
      /* @__PURE__ */ jsx("div", {
        className: "flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full",
        children: icon
      }),
      /* @__PURE__ */ jsx("span", {
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
var Browser = memo(({ id }) => {
  var _a, _b;
  const [tabs, setTabs] = useState([{ ...DEFAULT_TAB_STATE }]);
  const urlInputRef = useRef(null);
  useKeyPressEvent(
    "Enter",
    useCallback(() => {
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
  const setActiveTab = useCallback((index) => {
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
  const removeTab = useCallback((index) => {
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
  const createTab = useCallback(() => {
    setTabs((tabs2) => [
      ...tabs2.map((tab) => ({ ...tab, active: false })),
      { ...DEFAULT_TAB_STATE }
    ]);
  }, []);
  const setUrlToActiveTab = useCallback((url) => {
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
  const goBack = useCallback(() => {
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
  const goForward = useCallback(() => {
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
  return /* @__PURE__ */ jsxs("div", {
    className: "relative flex flex-col flex-grow rounded-b-md",
    id,
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex w-full h-10 px-3 bg-gray-900",
        children: [
          tabs.map(({ ref, active, url, prev, next }, index) => /* @__PURE__ */ jsxs("div", {
            className: `flex items-center overflow-hidden justify-between mt-2 w-full max-w-[16rem] px-2 text-xs text-gray-100 rounded-t-md hover:bg-gray-800 ${active ? "bg-gray-800" : "border-r border-gray-800"}`,
            children: [
              /* @__PURE__ */ jsxs("button", {
                className: "flex items-center flex-grow h-8 min-w-0 space-x-2",
                onClick: () => setActiveTab(index),
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className: "flex-shrink-0",
                    children: /* @__PURE__ */ jsx(AiFillCloud, {})
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: "flex-shrink truncate",
                    children: !url ? "New tab" : url
                  })
                ]
              }),
              /* @__PURE__ */ jsx("button", {
                onClick: () => removeTab(index),
                className: "flex items-center flex-shrink-0 rounded-full hover:bg-gray-600 p-0.5   ",
                children: /* @__PURE__ */ jsx(AiOutlineClose, {})
              })
            ]
          }, index)),
          /* @__PURE__ */ jsx("button", {
            onClick: () => createTab(),
            className: "flex items-center self-center justify-center w-5 h-5 mt-2 ml-2 text-gray-100 rounded-full hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ jsx(AiOutlinePlus, {})
          })
        ]
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center w-full h-10 px-4 space-x-2 bg-gray-800",
        children: [
          /* @__PURE__ */ jsx("button", {
            onClick: goBack,
            disabled: ((_a = tabs.find(({ active }) => active)) == null ? void 0 : _a.prev.length) === 0,
            className: "flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full disabled:hover:bg-gray-800 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:hover:cursor-default hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ jsx(AiOutlineArrowLeft, {})
          }),
          /* @__PURE__ */ jsx("button", {
            onClick: goForward,
            disabled: ((_b = tabs.find(({ active }) => active)) == null ? void 0 : _b.next.length) === 0,
            className: "flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full disabled:hover:bg-gray-800 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:hover:cursor-default hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ jsx(AiOutlineArrowRight, {})
          }),
          /* @__PURE__ */ jsx("button", {
            className: "flex items-center self-center justify-center w-6 h-6 text-gray-100 rounded-full hover:bg-gray-100 hover:text-gray-800",
            children: /* @__PURE__ */ jsx(AiOutlineReload, {})
          }),
          /* @__PURE__ */ jsx("input", {
            ref: urlInputRef,
            className: "flex-grow px-4 py-1 text-sm text-gray-100 bg-gray-900 rounded-full outline-none focus:border-0 focus:ring-2 focus:ring-blue-300"
          })
        ]
      }),
      tabs.map(
        ({ url, active }, index) => !!url ? /* @__PURE__ */ jsx("iframe", {
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
        }, index) : /* @__PURE__ */ jsx("div", {
          style: {
            zIndex: active ? 1 : 0,
            top: "5rem",
            height: "calc(100% - 5rem)"
          },
          className: "absolute left-0 flex flex-col items-center justify-center w-full overflow-hidden bg-gray-900 rounded-b-md",
          children: /* @__PURE__ */ jsxs("div", {
            className: "grid flex-shrink-0 grid-cols-4 mx-auto gap-y-8 gap-x-12",
            children: [
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.github.com"),
                icon: /* @__PURE__ */ jsx(AiFillGithub, {
                  className: "w-8 h-8 text-white rounded-full"
                }),
                title: "Github"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
                  className: "w-8 h-8 text-yellow-600 rounded-full"
                }),
                title: "Stack overflow"
              }),
              /* @__PURE__ */ jsx(SuggestionButton, {
                onClick: () => setUrlToActiveTab("https://www.stackoverflow.com"),
                icon: /* @__PURE__ */ jsx(FaStackOverflow, {
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
var BrowserIcon = memo(({ className }) => {
  return /* @__PURE__ */ jsxs("div", {
    className: classNames("relative", className),
    children: [
      /* @__PURE__ */ jsx("div", {
        className: classNames(
          "top-0 left-0 translate-x-[25%] translate-y-[21%] w-[67%] h-[66%] absolute bg-white rounded-b-lg",
          className
        )
      }),
      /* @__PURE__ */ jsx(SiBrave, {
        className: classNames("absolute text-orange-500", className)
      })
    ]
  });
});
export {
  Browser,
  BrowserIcon
};
