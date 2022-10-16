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
  LockScreen: () => LockScreen,
  ProcessManager: () => ProcessManager,
  Taskbar: () => Taskbar,
  Window: () => Window,
  WindowManager: () => WindowManager,
  useProcessManager: () => useProcessManager,
  useProcessManagerMethods: () => useProcessManagerMethods,
  useWindow: () => useWindow,
  useWindowManager: () => useWindowManager,
  useWindows: () => useWindows,
  useWindowsMethods: () => useWindowsMethods
});
module.exports = __toCommonJS(src_exports);

// src/store/useProcessManager.ts
var import_zustand2 = __toESM(require("zustand"));
var import_immer2 = require("zustand/middleware/immer");
var import_nanoid2 = require("nanoid");
var import_lodash2 = require("lodash");

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
  isResizing: false,
  isFullscreen: false,
  isMinimized: false,
  boundingBox: { ...DEFAULT_WINDOW_GEOMETRY }
};
var useWindowManager = (0, import_zustand.default)(
  (0, import_immer.immer)((set, get) => ({
    windows: {},
    create: (window2, shouldFocus = true) => {
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
      if (shouldFocus) {
        get().toForeground(windowId);
      }
      return windowId;
    },
    delete: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to delete window ID", windowId);
        return false;
      }
      useProcessManager.getState().deleteByRendererId(windowId);
      set((state) => {
        state.windows = (0, import_lodash.omit)(state.windows, windowId);
      });
      return true;
    },
    move: (windowId, delta) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to move window ID", windowId);
        return false;
      }
      set((state) => {
        state.windows[windowId].boundingBox.x += delta.x;
        state.windows[windowId].boundingBox.y += delta.y;
      });
      return true;
    },
    resize: (windowId, size) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to resize window ID", windowId);
        return false;
      }
      set((state) => {
        state.windows[windowId].boundingBox.width = size.width;
        state.windows[windowId].boundingBox.height = size.height;
      });
      return true;
    },
    onResizeStart: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to start resizing window ID", windowId);
        return;
      }
      set((state) => {
        state.windows[windowId].isResizing = true;
      });
    },
    onResizeEnd: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to stop resizing window ID", windowId);
        return;
      }
      set((state) => {
        state.windows[windowId].isResizing = false;
      });
    },
    focus: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to focus window ID", windowId);
        return false;
      }
      set((state) => {
        (0, import_lodash.each)(state.windows, (window2) => {
          if (window2.isFocused && window2.id !== windowId) {
            window2.isFocused = false;
          } else if (!window2.isFocused && window2.id === windowId)
            window2.isFocused = true;
        });
      });
      return true;
    },
    maximize: (windowId) => {
      if (get().toForeground(windowId)) {
        set((state) => {
          const desktopElement = document.getElementById("__desktop__");
          if (desktopElement) {
            state.windows[windowId].previousboundingBox = {
              ...state.windows[windowId].boundingBox
            };
            state.windows[windowId].boundingBox.width = desktopElement.getBoundingClientRect().width;
            state.windows[windowId].boundingBox.height = desktopElement.getBoundingClientRect().height;
            state.windows[windowId].boundingBox.x = 0;
            state.windows[windowId].boundingBox.y = 0;
            state.windows[windowId].isFullscreen = true;
          }
        });
        return true;
      }
      return false;
    },
    minimize: (windowId) => {
      if (get().toBackground(windowId)) {
        set((state) => {
          state.windows[windowId].isMinimized = true;
        });
        return true;
      }
      return false;
    },
    restore: (windowId) => {
      if (get().toForeground(windowId)) {
        set((state) => {
          if (state.windows[windowId].previousboundingBox) {
            state.windows[windowId].isFullscreen = false;
            state.windows[windowId].boundingBox = {
              ...state.windows[windowId].previousboundingBox
            };
          }
        });
        return true;
      }
      return false;
    },
    toForeground: (windowId, shouldFocus = true) => {
      var _a;
      if (!get().windows[windowId]) {
        console.error("Impossible to place in foreground window ID", windowId);
        return false;
      }
      const highestZIndex = ((_a = (0, import_lodash.maxBy)(Object.values(get().windows), "zIndex")) == null ? void 0 : _a.zIndex) ?? 0;
      if (shouldFocus) {
        get().focus(windowId);
      }
      set((state) => {
        state.windows[windowId].zIndex = highestZIndex + 1;
        state.windows[windowId].isMinimized = false;
      });
      return true;
    },
    toBackground: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to place in background window ID", windowId);
        return false;
      }
      set((state) => {
        state.windows[windowId].zIndex = 0;
      });
      return true;
    }
  }))
);

// src/store/useProcessManager.ts
var useProcessManager = (0, import_zustand2.default)(
  (0, import_immer2.immer)((set, get) => ({
    processes: {},
    create: (process) => {
      const processId = process.id ?? (0, import_nanoid2.nanoid)();
      let rendererId = "";
      if (!!get().processes[processId]) {
        console.error(
          "Impossible to create a process with the same id as an existing one"
        );
        return void 0;
      }
      if (process.renderer === "window") {
        const windowId = useWindowManager.getState().create({ id: processId, title: process.name, icon: process.icon });
        if (windowId)
          rendererId = windowId;
      }
      set((state) => {
        state.processes[processId] = {
          ...process,
          id: processId,
          rendererId
        };
      });
      return processId;
    },
    delete: (processId) => {
      const process = get().processes[processId];
      if (!process) {
        console.error("Impossible to delete process ID", processId);
        return false;
      }
      if (process.renderer === "window" && process.rendererId) {
        useWindowManager.getState().delete(process.rendererId);
      }
      set((state) => {
        state.processes = (0, import_lodash2.omit)(state.processes, processId);
      });
      return true;
    },
    deleteByRendererId: (processRendererId) => {
      const process = Object.values(get().processes).find(
        ({ rendererId }) => processRendererId === rendererId
      );
      if (!process) {
        console.error(
          "Impossible to delete process by renderer ID",
          processRendererId
        );
        return false;
      }
      set((state) => {
        if (process.id)
          state.processes = (0, import_lodash2.omit)(state.processes, process.id);
      });
      return true;
    }
  }))
);

// src/ProcessManager.tsx
var import_react5 = require("react");

// src/components/Window.tsx
var import_react4 = require("react");
var import_core2 = require("@dnd-kit/core");

// ../../node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var import_react = require("react");
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

// src/components/WindowContainer.tsx
var import_react3 = require("react");
var import_react_resizable = require("react-resizable");

// src/components/WindowHeader.tsx
var import_react2 = require("react");
var import_core = require("@dnd-kit/core");
var import_bs = require("react-icons/bs");
var import_bi = require("react-icons/bi");
var import_ai = require("react-icons/ai");
var import_jsx_runtime = require("react/jsx-runtime");
var WindowHeader = (0, import_react2.memo)(({ id }) => {
  const {
    title,
    isFullscreen,
    icon: Icon
  } = useWindowManager(
    (0, import_react2.useCallback)(
      (state) => {
        var _a, _b, _c;
        return {
          title: (_a = state.windows[id]) == null ? void 0 : _a.title,
          isFullscreen: (_b = state.windows[id]) == null ? void 0 : _b.isFullscreen,
          icon: (_c = state.windows[id]) == null ? void 0 : _c.icon
        };
      },
      [id]
    )
  );
  const { deleteWindow, restoreWindow, maximizeWindow, minimizeWindow } = useWindowManager(
    (0, import_react2.useCallback)(
      (state) => ({
        deleteWindow: state.delete,
        restoreWindow: state.restore,
        maximizeWindow: state.maximize,
        minimizeWindow: state.minimize
      }),
      []
    )
  );
  const { attributes, listeners, setActivatorNodeRef } = (0, import_core.useDraggable)({
    id
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: `flex items-center justify-between flex-shrink-0 w-full h-10 px-4 space-x-3 bg-gray-800 ${isFullscreen ? "" : "rounded-t-md"}`,
    ref: setActivatorNodeRef,
    ...listeners,
    ...attributes,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex items-center space-x-2 overflow-hidden ",
        children: [
          Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
            className: "w-5 h-5"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "min-w-0 text-sm font-semibold truncate select-none text-gray-50 ",
            children: title
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex items-center text-gray-100 space-x-4",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onMouseDown: (e) => {
              e.stopPropagation();
              e.preventDefault();
            },
            onMouseUp: (e) => {
              e.stopPropagation();
              e.preventDefault();
              minimizeWindow(id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineLine, {
              className: "w-4 h-4"
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onMouseDown: (e) => {
              e.stopPropagation();
              e.preventDefault();
            },
            onMouseUp: (e) => {
              e.stopPropagation();
              e.preventDefault();
              if (isFullscreen)
                restoreWindow(id);
              else
                maximizeWindow(id);
            },
            children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_bi.BiWindows, {
              className: "w-4 h-4"
            }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_bs.BsSquare, {
              className: "w-3 h-3"
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onMouseDown: (e) => {
              e.stopPropagation();
              e.preventDefault();
            },
            onMouseUp: (e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteWindow(id);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ai.AiOutlineClose, {
              className: "w-4 h-4"
            })
          })
        ]
      })
    ]
  });
});

// src/components/WindowContainer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var resizeHandles = ["se"];
var handleSize = [8, 8];
var WindowContainer = (0, import_react3.memo)(({ id, children }) => {
  const { boundingBox, isFullscreen } = useWindowManager(
    (0, import_react3.useCallback)(
      (state) => {
        var _a, _b;
        return {
          boundingBox: (_a = state.windows[id]) == null ? void 0 : _a.boundingBox,
          isFullscreen: (_b = state.windows[id]) == null ? void 0 : _b.isFullscreen
        };
      },
      [id]
    )
  );
  const { resizeWindow, onResizeStart, onResizeEnd } = useWindowManager(
    (0, import_react3.useCallback)(
      (state) => ({
        resizeWindow: state.resize,
        onResizeStart: state.onResizeStart,
        onResizeEnd: state.onResizeEnd
      }),
      [id]
    )
  );
  const handleResizeStart = (0, import_react3.useCallback)(
    (_, data) => onResizeStart(id),
    [id, onResizeStart]
  );
  const handleResizeStop = (0, import_react3.useCallback)(
    (_, data) => {
      onResizeEnd(id);
      resizeWindow(id, data.size);
    },
    [id, resizeWindow, onResizeEnd]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_resizable.ResizableBox, {
    width: (boundingBox == null ? void 0 : boundingBox.width) || 0,
    height: (boundingBox == null ? void 0 : boundingBox.height) || 0,
    resizeHandles: isFullscreen ? [] : resizeHandles,
    handleSize,
    onResizeStart: handleResizeStart,
    onResizeStop: handleResizeStop,
    className: `${isFullscreen ? "transition-[height,width] ease-in duration-[40ms] motion-reduce:transition-none" : "rounded-md"}`,
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
      className: "flex flex-col w-full h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(WindowHeader, {
          id
        }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
          className: "flex flex-col flex-grow overflow-y-auto",
          children
        })
      ]
    })
  });
});

// src/components/Window.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Window = (0, import_react4.memo)(({ id, children }) => {
  const { boundingBox, zIndex, isFullscreen, isMinimized } = useWindowManager(
    (0, import_react4.useCallback)(
      (state) => {
        var _a, _b, _c, _d;
        return {
          boundingBox: (_a = state.windows[id]) == null ? void 0 : _a.boundingBox,
          zIndex: (_b = state.windows[id]) == null ? void 0 : _b.zIndex,
          isFullscreen: (_c = state.windows[id]) == null ? void 0 : _c.isFullscreen,
          isMinimized: (_d = state.windows[id]) == null ? void 0 : _d.isMinimized
        };
      },
      [id]
    )
  );
  const { toForeground } = useWindowManager(
    (0, import_react4.useCallback)(
      (state) => ({
        toForeground: state.toForeground
      }),
      [id]
    )
  );
  const memoizedToForeground = (0, import_react4.useCallback)(() => toForeground(id), [id]);
  const { setNodeRef, transform } = (0, import_core2.useDraggable)({
    id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    top: boundingBox == null ? void 0 : boundingBox.y,
    left: boundingBox == null ? void 0 : boundingBox.x,
    zIndex
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
    className: `absolute
      ${isMinimized ? "invisible" : ""}
      ${isFullscreen ? "transition-[top,left] ease-in duration-[40ms] motion-reduce:transition-none" : "shadow-2xl rounded-b-md"}`,
    ref: setNodeRef,
    style,
    onMouseDown: memoizedToForeground,
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WindowContainer, {
      id,
      children
    })
  });
});

// src/ProcessManager.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var ProcessManager = ({
  processRenderer
}) => {
  const { processes } = useProcessManager(
    (0, import_react5.useCallback)(
      (state) => ({
        processes: Object.values(state.processes).filter(
          ({ renderer }) => renderer === processRenderer
        )
      }),
      [processRenderer]
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, {
    children: processes.map(({ id, rendererId, root: Root }) => {
      if (rendererId)
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Window, {
          id: rendererId,
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Root, {
            id
          })
        }, rendererId);
    })
  });
};

// src/hooks/useProcessManagerMethods.ts
var import_react6 = require("react");
function useProcessManagerMethods() {
  return useProcessManager(
    (0, import_react6.useCallback)(
      (state) => ({
        createProcess: state.create,
        deleteProcess: state.delete
      }),
      []
    )
  );
}

// src/WindowManager.tsx
var import_react7 = require("react");
var import_core3 = require("@dnd-kit/core");
var import_modifiers = require("@dnd-kit/modifiers");
var import_jsx_runtime5 = require("react/jsx-runtime");
var WindowManager = ({
  onDragEnd,
  ...windowManagerProps
}) => {
  const { moveWindow } = useWindowManager(
    (0, import_react7.useCallback)((state) => ({ moveWindow: state.move }), [])
  );
  const _onDragEnd = (0, import_react7.useCallback)(
    (event) => {
      moveWindow(event.active.id, event.delta);
      if (onDragEnd && typeof onDragEnd === "function")
        onDragEnd(event);
    },
    [onDragEnd, moveWindow]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_core3.DndContext, {
    modifiers: [import_modifiers.restrictToParentElement],
    onDragEnd: _onDragEnd,
    ...windowManagerProps
  });
};

// src/components/Desktop.tsx
var import_core4 = require("@dnd-kit/core");
var import_jsx_runtime6 = require("react/jsx-runtime");
var DesktopID = "__system_desktop__";
var Desktop = ({ children }) => {
  const { setNodeRef } = (0, import_core4.useDroppable)({
    id: DesktopID
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
    className: "flex flex-grow relative",
    id: "__desktop__",
    ref: setNodeRef,
    children
  });
};

// src/components/Taskbar/Taskbar.tsx
var import_react12 = require("react");
var import_lodash3 = require("lodash");
var import_process_config = require("@sysfolio/process-config");

// src/hooks/usePinnedProcesses.ts
var import_react8 = require("react");
function usePinnedProcesses() {
  if (typeof window === "undefined")
    return [["spotify", "code", "browser"], () => {
    }];
  const [pinnedProcesses, setPinnedProcesses] = (0, import_react8.useState)([
    "spotify",
    "code",
    "browser"
  ]);
  (0, import_react8.useEffect)(() => {
    setPinnedProcesses(
      JSON.parse(window.localStorage.getItem(`__pinned_tasks__`) || "[]")
    );
    return () => window.localStorage.setItem(
      `__pinned_tasks__`,
      JSON.stringify(pinnedProcesses)
    );
  }, [setPinnedProcesses]);
  return [pinnedProcesses, setPinnedProcesses];
}

// src/components/Taskbar/ProcessHoverCards.tsx
var import_react10 = require("react");
var import_io5 = require("react-icons/io5");
var import_system_ui = require("@sysfolio/system-ui");

// src/hooks/useProcessScreenshot.ts
var import_react9 = require("react");
var import_html_to_image = require("html-to-image");
function useProcessScreenshot(processId) {
  const [src, setSrc] = (0, import_react9.useState)(null);
  const takeScreenshot = (0, import_react9.useCallback)(async () => {
    try {
      if (!processId)
        return;
      const process = useProcessManager.getState().processes[processId];
      if (!(process == null ? void 0 : process.rendererId) || process.renderer !== "window")
        return;
      const element = document.getElementById(processId);
      if (!element || element.tagName === "IFRAME")
        return;
      const canvas = await (0, import_html_to_image.toCanvas)(element);
      setSrc(canvas.toDataURL());
    } catch {
      console.error("Unable to generate preview");
    }
  }, [processId]);
  return { miniature: src, takeScreenshot };
}

// src/components/Taskbar/ProcessHoverCards.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var WindowRenderedRunningProcessHoverCard = ({ process }) => {
  const { miniature, takeScreenshot } = useProcessScreenshot(process.id);
  const { isMinimized } = useWindowManager(
    (0, import_react10.useCallback)(
      (state) => {
        var _a;
        return {
          isMinimized: ((_a = state.windows[process.rendererId]) == null ? void 0 : _a.isMinimized) || false
        };
      },
      []
    )
  );
  const { toForeground, deleteWindow } = useWindowManager(
    (0, import_react10.useCallback)(
      (state) => ({
        toForeground: state.toForeground,
        deleteWindow: state.delete
      }),
      []
    )
  );
  const onOpenChange = (0, import_react10.useCallback)(
    (open) => {
      if (isMinimized || open === false)
        return;
      takeScreenshot();
    },
    [isMinimized]
  );
  (0, import_react10.useEffect)(() => {
    if (process.rendererId)
      takeScreenshot();
  }, [process.rendererId, takeScreenshot]);
  if (!process.id)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_system_ui.HoverCardRoot, {
    onOpenChange,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.HoverCardTrigger, {
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", {
          className: "flex items-center rounded px-3 text-sm font-semibold text-white bg-gray-700 min-w-0 py-2 border-t-4 border-gray-600",
          onClick: () => toForeground(process.rendererId),
          children: process.icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.icon, {
            className: "w-6 h-6"
          })
        }, process.id)
      }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.HoverCard, {
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
          className: "relative",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", {
              type: "button",
              className: "absolute -top-0.5 -right-2 inline-flex items-center rounded-full border border-transparent bg-red-600 p-0.5 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1",
              onClick: () => deleteWindow(process.rendererId),
              children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_io5.IoCloseOutline, {
                className: "h-4 w-4",
                "aria-hidden": "true"
              })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", {
              className: "text-sm font-medium text-gray-100",
              children: process.name
            }),
            process.description && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", {
              className: "mt-1 text-sm font-normal text-gray-400",
              children: process.description
            }),
            miniature && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("img", {
              onClick: () => toForeground(process.rendererId),
              src: miniature,
              className: "my-3 rounded-sm hover:ring-1 hover:ring-blue-500 focus:ring-1 focus:ring-blue-500",
              alt: "Process miniature"
            })
          ]
        })
      })
    ]
  });
};
var ProcessStartupLinkHoverCard = ({ process }) => {
  const { createProcess } = useProcessManager(
    (0, import_react10.useCallback)(
      (state) => ({
        createProcess: state.create
      }),
      []
    )
  );
  const onProcessCreate = (0, import_react10.useCallback)(() => {
    createProcess(process);
  }, [createProcess, process]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_system_ui.HoverCardRoot, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.HoverCardTrigger, {
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", {
          className: "flex items-center rounded px-3 text-sm font-semibold text-white min-w-0 py-2 hover:bg-gray-700 focus:bg-gray-700",
          onClick: onProcessCreate,
          children: [
            process.icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.icon, {
              className: "w-5 h-5"
            }),
            !process.icon && (process.dynamicName ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicName, {}) : process.name)
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.HoverCard, {
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", {
              className: "text-sm font-medium text-gray-100",
              children: process.dynamicName ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicName, {}) : process.name
            }),
            process.description && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", {
              className: "mt-1 text-sm font-normal text-gray-400",
              children: process.dynamicDescription ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicDescription, {}) : process.description
            })
          ]
        })
      })
    ]
  });
};
var ProcessStartupSingletonHoverCard = ({ process }) => {
  const [processId, setProcessId] = (0, import_react10.useState)();
  const { processes } = useProcessManager(
    (0, import_react10.useCallback)(
      (state) => ({
        processes: state.processes
      }),
      []
    )
  );
  const { createProcess, deleteProcess } = useProcessManager(
    (0, import_react10.useCallback)(
      (state) => ({
        createProcess: state.create,
        deleteProcess: state.delete
      }),
      []
    )
  );
  const onProcessCreate = (0, import_react10.useCallback)(() => {
    if (Object.values(processes).some(({ type }) => type === process.type))
      return;
    setProcessId(createProcess(process));
  }, [createProcess, processes, process]);
  if (processId)
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_system_ui.PopoverRoot, {
      defaultOpen: true,
      onOpenChange: (open) => {
        if (!open) {
          deleteProcess(processId);
          setProcessId(void 0);
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.PopoverTrigger, {
          asChild: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", {
            className: "flex items-center rounded px-3 text-sm font-semibold text-white min-w-0 py-2 hover:bg-gray-700 focus:bg-gray-700",
            onClick: onProcessCreate,
            children: [
              process.icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.icon, {
                className: "w-5 h-5"
              }),
              !process.icon && (process.dynamicName ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicName, {}) : process.name)
            ]
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.Popover, {
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.root, {
            id: processId
          })
        })
      ]
    });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_system_ui.HoverCardRoot, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.HoverCardTrigger, {
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", {
          className: "flex items-center rounded px-3 text-sm font-semibold text-white min-w-0 py-2 hover:bg-gray-700 focus:bg-gray-700",
          onClick: onProcessCreate,
          children: [
            process.icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.icon, {
              className: "w-5 h-5"
            }),
            !process.icon && (process.dynamicName ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicName, {}) : process.name)
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_system_ui.HoverCard, {
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", {
              className: "text-sm font-medium text-gray-100",
              children: process.dynamicName ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicName, {}) : process.name
            }),
            process.description && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", {
              className: "mt-1 text-sm font-normal text-gray-400",
              children: process.dynamicDescription ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(process.dynamicDescription, {}) : process.description
            })
          ]
        })
      })
    ]
  });
};

// src/components/ApplicationLaucher.tsx
var import_system_ui2 = require("@sysfolio/system-ui");

// src/components/SysfolioIcon.tsx
var import_react11 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var SysfolioIcon = (0, import_react11.memo)(
  ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", {
    width: 20,
    height: 19,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", {
        width: 20,
        height: 5,
        rx: 2.5,
        transform: "matrix(-1 0 0 1 20 0)",
        fill: "url(#a)"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", {
        fill: "#FEEE5C",
        d: "M4 2H0v7h4z"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", {
        width: 20,
        height: 5,
        rx: 2.5,
        transform: "matrix(-1 0 0 1 20 14)",
        fill: "url(#b)"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", {
        width: 20,
        height: 5,
        rx: 2.5,
        transform: "matrix(-1 0 0 1 20 7)",
        fill: "url(#c)"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("defs", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("linearGradient", {
            id: "a",
            x1: 10,
            y1: 0,
            x2: 10,
            y2: 5,
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 0.771,
                stopColor: "#FEEE5C"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 1,
                stopColor: "#FFE820",
                stopOpacity: 0.286
              }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 1,
                stopColor: "#FFE607",
                stopOpacity: 0
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("linearGradient", {
            id: "b",
            x1: 10,
            y1: 0,
            x2: 10,
            y2: 5,
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 0.771,
                stopColor: "#FEEE5C"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 1,
                stopColor: "#FFE820",
                stopOpacity: 0.286
              }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 1,
                stopColor: "#FFE607",
                stopOpacity: 0
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("linearGradient", {
            id: "c",
            x1: 10,
            y1: 0,
            x2: 10,
            y2: 5,
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 0.771,
                stopColor: "#FEEE5C"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 1,
                stopColor: "#FFE820",
                stopOpacity: 0.286
              }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("stop", {
                offset: 1,
                stopColor: "#FFE607",
                stopOpacity: 0
              })
            ]
          })
        ]
      })
    ]
  })
);

// src/components/ApplicationLaucher.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var ApplicationLaucher = ({
  children
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_system_ui2.PopoverRoot, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_system_ui2.PopoverTrigger, {
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", {
          className: "flex items-center rounded px-3 text-sm font-semibold text-white min-w-0 py-2 hover:bg-gray-700 focus:bg-gray-700",
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SysfolioIcon, {
            className: "w-5 h-5"
          })
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_system_ui2.Popover, {
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {})
      })
    ]
  });
};

// src/components/Taskbar/Taskbar.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var Taskbar = ({}) => {
  const processes = useProcessManager(
    (0, import_react12.useCallback)((state) => Object.values(state.processes), [])
  );
  const [pinnedProcesses] = usePinnedProcesses();
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", {
    className: "flex items-center justify-between w-full h-12 max-w-full bg-gray-800",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", {
        className: "flex items-center flex-1 flex-shrink min-w-0 px-1 gap-x-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ApplicationLaucher, {}),
          (0, import_lodash3.compact)(
            pinnedProcesses.map(
              (pinnedProcess) => import_process_config.config.find(({ type }) => type === pinnedProcess)
            )
          ).map((pinnedProcess) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ProcessStartupLinkHoverCard, {
            process: pinnedProcess
          }, pinnedProcess.type)),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", {
            className: "w-0.5 h-8 !ml-1 bg-gray-600/10"
          }),
          processes.filter(({ renderer }) => renderer === "window").map((process) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(WindowRenderedRunningProcessHoverCard, {
            process
          }, process.id))
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", {
        className: "flex items-center flex-shrink-0 mr-3",
        children: import_process_config.config.filter(({ renderer }) => renderer === "popover").map((process) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ProcessStartupSingletonHoverCard, {
          process
        }, process.type))
      })
    ]
  });
};

// src/components/LockScreen.tsx
var import_react13 = require("react");
var import_date_fns = require("date-fns");
var import_bs2 = require("react-icons/bs");
var import_react_use = require("react-use");
var import_jsx_runtime11 = require("react/jsx-runtime");
var TWO_MINUTE = 12e4;
var FIVE_SECOND = 5e3;
function useIsScreenLock() {
  const isInactive = (0, import_react_use.useIdle)(TWO_MINUTE);
  const [isScreenLock, setIsScreenLock] = (0, import_react13.useState)(false);
  (0, import_react13.useEffect)(() => {
    if (isInactive && !isScreenLock)
      setIsScreenLock(true);
  }, [isInactive]);
  return { isScreenLock, setIsScreenLock, isInactive };
}
var LockScreen = ({ children }) => {
  const { isScreenLock, isInactive, setIsScreenLock } = useIsScreenLock();
  const [today, setToday] = (0, import_react13.useState)(new Date());
  (0, import_react_use.useInterval)(() => {
    setToday(new Date());
  }, FIVE_SECOND);
  if (!isScreenLock)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", {
    className: "absolute flex flex-col justify-center items-center h-screen w-screen backdrop-blur-md bg-gray-900/80 z-[999999]",
    children: [
      isInactive && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", {
        className: "flex flex-col items-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", {
            className: "text-8xl text-white",
            children: (0, import_date_fns.format)(today, "p")
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", {
            className: "text-3xl text-white pt-12",
            children: (0, import_date_fns.format)(today, "PPP")
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", {
            className: "text-md text-white pt-2",
            children: "Click or press a key to unlock"
          })
        ]
      }),
      !isInactive && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("form", {
        onSubmit: () => setIsScreenLock(false),
        className: "flex flex-col items-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("img", {
            className: "inline-block h-28 w-28 rounded-full",
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            alt: ""
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", {
            className: "text-xl text-white pt-3",
            children: "Admin"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", {
            className: "relative flex space-x-3 mt-8",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("input", {
                type: "password",
                className: "min-w-lg focus:border-indigo-500 focus:ring-indigo-500 text-md text-white py-1 px-2 bg-gray-700 focus:outline-none"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", {
                type: "submit",
                className: "absolute left-full -translate-y-1 inline-flex items-center rounded-full bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_bs2.BsUnlock, {
                  className: "h-5 w-5",
                  "aria-hidden": "true"
                })
              })
            ]
          })
        ]
      })
    ]
  });
};

// src/hooks/useWindows.ts
var import_react14 = require("react");
function useWindows() {
  return useWindowManager(
    (0, import_react14.useCallback)((state) => Object.values(state.windows), [])
  );
}

// src/hooks/useWindowsMethods.ts
var import_react15 = require("react");
function useWindowsMethods() {
  return useWindowManager(
    (0, import_react15.useCallback)(
      (state) => ({
        createWindow: state.create,
        deleteWindow: state.delete,
        moveWindow: state.move
      }),
      []
    )
  );
}

// src/hooks/useWindow.ts
var import_react16 = require("react");
function useWindow(id) {
  return useWindowManager((0, import_react16.useCallback)((state) => state.windows[id], [id]));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Desktop,
  DesktopID,
  LockScreen,
  ProcessManager,
  Taskbar,
  Window,
  WindowManager,
  useProcessManager,
  useProcessManagerMethods,
  useWindow,
  useWindowManager,
  useWindows,
  useWindowsMethods
});
