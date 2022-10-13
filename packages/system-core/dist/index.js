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
      });
      return true;
    },
    toBackground: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to place in foreground window ID", windowId);
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
        console.log(process.rendererId);
        useWindowManager.getState().delete(process.rendererId);
      }
      set((state) => {
        console.log(processId, { ...state.processes });
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
  const { deleteWindow, restoreWindow, maximizeWindow } = useWindowManager(
    (0, import_react2.useCallback)(
      (state) => ({
        deleteWindow: state.delete,
        restoreWindow: state.restore,
        maximizeWindow: state.maximize
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
  const { boundingBox, zIndex, isFullscreen } = useWindowManager(
    (0, import_react4.useCallback)(
      (state) => {
        var _a, _b, _c;
        return {
          boundingBox: (_a = state.windows[id]) == null ? void 0 : _a.boundingBox,
          zIndex: (_b = state.windows[id]) == null ? void 0 : _b.zIndex,
          isFullscreen: (_c = state.windows[id]) == null ? void 0 : _c.isFullscreen
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
    className: `absolute ${isFullscreen ? "transition-[top,left] ease-in duration-[40ms] motion-reduce:transition-none" : "shadow-2xl rounded-b-md"}`,
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
    children: processes.map(({ renderer, rendererId, root: Root }) => {
      if (renderer === "window" && rendererId)
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Window, {
          id: rendererId,
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Root, {})
        }, rendererId);
      else if (renderer === "other") {
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Root, {});
      }
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

// src/components/Taskbar.tsx
var import_react8 = require("react");
var import_process_config = require("@sysfolio/process-config");
var import_lodash3 = require("lodash");
var import_jsx_runtime7 = require("react/jsx-runtime");
function usePinnedProcesses() {
  if (typeof window === "undefined")
    return [[], () => {
    }];
  const [pinnedProcesses, setPinnedProcesses] = (0, import_react8.useState)([
    "spotify",
    "code"
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
var Taskbar = ({}) => {
  const processes = useProcessManager(
    (0, import_react8.useCallback)((state) => Object.values(state.processes), [])
  );
  const { createProcess } = useProcessManager(
    (0, import_react8.useCallback)(
      (state) => ({
        createProcess: state.create
      }),
      []
    )
  );
  const [pinnedProcesses] = usePinnedProcesses();
  const { toForeground, deleteWindow } = useWindowManager(
    (0, import_react8.useCallback)(
      (state) => ({
        toForeground: state.toForeground,
        deleteWindow: state.delete
      }),
      []
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
    className: "flex items-center justify-between w-full h-12 max-w-full bg-gray-800",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
        className: "flex items-center flex-1 flex-shrink min-w-0 px-1 gap-x-1",
        children: [
          (0, import_lodash3.compact)(
            pinnedProcesses.map(
              (pinnedProcess) => import_process_config.config.find(({ type }) => type === pinnedProcess)
            )
          ).map((pinnedProcess) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", {
            className: "flex items-center rounded px-3 py-2 text-sm font-semibold text-white min-w-0 hover:bg-gray-700",
            onClick: () => createProcess(pinnedProcess),
            children: pinnedProcess.icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(pinnedProcess.icon, {
              className: "w-5 h-5"
            })
          }, pinnedProcess.type)),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", {
            className: "w-0.5 h-8 !ml-1 bg-gray-600/10"
          }),
          processes.filter(({ renderer }) => renderer === "window").map(({ id, icon: Icon, rendererId }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", {
            className: "flex items-center rounded px-3 text-sm font-semibold text-white bg-gray-700 min-w-0 py-2 border-t-4 border-gray-600",
            onClick: () => toForeground(rendererId),
            children: Icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, {
              className: "w-6 h-6"
            })
          }, id))
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {
        className: "flex items-center flex-shrink-0 mr-3 space-x-1"
      })
    ]
  });
};

// src/components/LockScreen.tsx
var LockScreen = ({ children }) => {
  return null;
};

// src/hooks/useWindows.ts
var import_react9 = require("react");
function useWindows() {
  return useWindowManager(
    (0, import_react9.useCallback)((state) => Object.values(state.windows), [])
  );
}

// src/hooks/useWindowsMethods.ts
var import_react10 = require("react");
function useWindowsMethods() {
  return useWindowManager(
    (0, import_react10.useCallback)(
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
var import_react11 = require("react");
function useWindow(id) {
  return useWindowManager((0, import_react11.useCallback)((state) => state.windows[id], [id]));
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