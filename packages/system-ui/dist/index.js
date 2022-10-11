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
  Desktop: () => Desktop,
  DesktopID: () => DesktopID,
  Window: () => Window,
  WindowManager: () => WindowManager,
  useInitializeWindow: () => useInitializeWindow,
  useWindowManager: () => useWindowManager
});
module.exports = __toCommonJS(src_exports);

// src/WindowManager.tsx
var import_react = require("react");
var import_core = require("@dnd-kit/core");
var import_modifiers = require("@dnd-kit/modifiers");

// src/store/useWindowManager.ts
var import_zustand = __toESM(require("zustand"));
var import_immer = require("zustand/middleware/immer");
var import_lodash = require("lodash");
var import_nanoid = require("nanoid");
var DEFAULT_WINDOW_GEOMETRY = {
  width: 1e3,
  height: 1e3,
  x: 0,
  y: 0
};
var DEFAULT_WINDOW_CONSTANTS = {
  title: "Untitled",
  zIndex: 0,
  isFocused: false,
  isDragging: false,
  isFullscreen: false,
  boundingBox: { ...DEFAULT_WINDOW_GEOMETRY }
};
var useWindowManager = (0, import_zustand.default)(
  (0, import_immer.immer)((set, get) => ({
    windows: {},
    create: (window2) => {
      const windowId = window2.id ?? (0, import_nanoid.nanoid)();
      if (!!get().windows[windowId]) {
        console.error(
          "Impossible to create a window with the same id as an existing one"
        );
        return void 0;
      }
      set((state) => {
        state.windows[windowId] = {
          ...DEFAULT_WINDOW_CONSTANTS,
          ...window2,
          id: windowId
        };
      });
      return windowId;
    },
    delete: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }
      console.log("icii");
      set((state) => {
        console.log((0, import_lodash.omit)(state.windows, windowId));
        state.windows = (0, import_lodash.omit)(state.windows, windowId);
      });
      return true;
    },
    move: (windowId, delta) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }
      set((state) => {
        state.windows[windowId].boundingBox.x += delta.x;
        state.windows[windowId].boundingBox.y += delta.y;
      });
      return true;
    },
    resize: (windowId, delta) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }
      set((state) => {
        state.windows[windowId].boundingBox.width = Math.abs(
          state.windows[windowId].boundingBox.width + delta.x
        );
        state.windows[windowId].boundingBox.height = Math.abs(
          state.windows[windowId].boundingBox.height + delta.y
        );
      });
      return true;
    },
    toForeground: (windowId) => {
      var _a;
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }
      const highestZIndex = ((_a = (0, import_lodash.maxBy)(Object.values(get().windows), "zIndex")) == null ? void 0 : _a.zIndex) ?? 0;
      set((state) => {
        state.windows[windowId].zIndex = highestZIndex + 1;
      });
      return true;
    },
    toBackground: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }
      set((state) => {
        state.windows[windowId].zIndex = 0;
      });
      return true;
    },
    toFullScreen: (windowId) => {
      if (get().toForeground(windowId)) {
        set((state) => {
          state.windows[windowId].isFullscreen = true;
        });
        return true;
      }
      return false;
    }
  }))
);

// src/WindowManager.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var WindowManager = ({
  onDragEnd,
  ...windowManagerProps
}) => {
  const moveWindow = useWindowManager((0, import_react.useCallback)((state) => state.move, []));
  const _onDragEnd = (0, import_react.useCallback)(
    (event) => {
      moveWindow(event.active.id, event.delta);
      if (onDragEnd && typeof onDragEnd === "function")
        onDragEnd(event);
    },
    [onDragEnd, moveWindow]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.DndContext, {
    modifiers: [import_modifiers.restrictToParentElement],
    onDragEnd: _onDragEnd,
    ...windowManagerProps
  });
};

// src/Desktop.tsx
var import_core2 = require("@dnd-kit/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
var DesktopID = "__system_desktop__";
var Desktop = ({ children }) => {
  const { setNodeRef } = (0, import_core2.useDroppable)({
    id: DesktopID
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    className: "flex flex-grow relative",
    ref: setNodeRef,
    children
  });
};

// src/Window.tsx
var import_react4 = require("react");
var import_core3 = require("@dnd-kit/core");

// ../../node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var import_react2 = require("react");
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var CSS = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return `translate3d(${x ? Math.round(x) : 0}px, ${y ? Math.round(y) : 0}px, 0)`;
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return `scaleX(${scaleX}) scaleY(${scaleY})`;
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString({
      property,
      duration,
      easing
    }) {
      return `${property} ${duration}ms ${easing}`;
    }
  }
});

// src/Window.tsx
var import_react_resizable = require("react-resizable");
var import_bs = require("react-icons/bs");
var import_ai = require("react-icons/ai");

// src/hooks/useInitializeWindow.ts
var import_react3 = require("react");
var DEFAULT_OPTIONS = {};
function useInitializeWindow(options = DEFAULT_OPTIONS) {
  const createWindow = useWindowManager(
    (0, import_react3.useCallback)((state) => state.create, [])
  );
  (0, import_react3.useEffect)(() => {
    createWindow(options);
  }, []);
}

// src/Window.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Window = (0, import_react4.memo)(({ id, children }) => {
  useInitializeWindow({ id });
  const { boundingBox, title, zIndex, isFullscreen } = useWindowManager(
    (0, import_react4.useCallback)(
      (state) => {
        var _a, _b, _c, _d;
        return {
          boundingBox: (_a = state.windows[id]) == null ? void 0 : _a.boundingBox,
          title: (_b = state.windows[id]) == null ? void 0 : _b.title,
          zIndex: (_c = state.windows[id]) == null ? void 0 : _c.zIndex,
          isFullscreen: (_d = state.windows[id]) == null ? void 0 : _d.isFullscreen
        };
      },
      [id]
    )
  );
  const { deleteWindow, resizeWindow, moveWindow, toFullScreen } = useWindowManager(
    (0, import_react4.useCallback)(
      (state) => ({
        deleteWindow: state.delete,
        resizeWindow: state.resize,
        moveWindow: state.move,
        toFullScreen: state.toFullScreen
      }),
      []
    )
  );
  const { attributes, listeners, setNodeRef, transform } = (0, import_core3.useDraggable)({
    id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    top: boundingBox == null ? void 0 : boundingBox.y,
    left: boundingBox == null ? void 0 : boundingBox.x,
    zIndex
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
    className: "absolute",
    ref: setNodeRef,
    style,
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_resizable.ResizableBox, {
      className: "absolute",
      width: boundingBox == null ? void 0 : boundingBox.width,
      height: boundingBox == null ? void 0 : boundingBox.height,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
        className: "flex flex-col w-full h-full",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
            className: `flex items-center justify-between flex-shrink-0 w-full h-10 px-4 space-x-3 bg-gray-800 ${isFullscreen ? "" : "rounded-t-md"}`,
            ...listeners,
            ...attributes,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
                className: "flex items-center space-x-3 overflow-hidden ",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", {
                  className: "min-w-0 text-sm font-semibold truncate cursor-default text-gray-50 pointer-event-none",
                  children: title
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
                className: "flex items-center text-gray-100 space-x-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", {
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ai.AiOutlineLine, {
                      className: "w-4 h-4"
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", {
                    onMouseDown: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toFullScreen(id);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_bs.BsSquare, {
                      className: "w-3 h-3"
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", {
                    onMouseDown: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      deleteWindow(id);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ai.AiOutlineClose, {
                      className: "w-4 h-4"
                    })
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
            className: "flex flex-col flex-grow overflow-y-auto rounded-b-md bg-gray-900 text-white",
            children
          })
        ]
      })
    })
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Desktop,
  DesktopID,
  Window,
  WindowManager,
  useInitializeWindow,
  useWindowManager
});
