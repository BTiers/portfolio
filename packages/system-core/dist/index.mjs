// src/store/useProcessManager.ts
import create2 from "zustand";
import { immer as immer2 } from "zustand/middleware/immer";
import { nanoid as nanoid2 } from "nanoid";
import { omit as omit2 } from "lodash";

// src/store/useWindowManager.ts
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { each, maxBy, omit } from "lodash";
import { nanoid } from "nanoid";
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
var useWindowManager = create(
  immer((set, get) => ({
    windows: {},
    create: (window2, shouldFocus = true) => {
      const windowId = window2.id ?? nanoid();
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
        state.windows = omit(state.windows, windowId);
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
        each(state.windows, (window2) => {
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
      const highestZIndex = ((_a = maxBy(Object.values(get().windows), "zIndex")) == null ? void 0 : _a.zIndex) ?? 0;
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
var useProcessManager = create2(
  immer2((set, get) => ({
    processes: {},
    create: (process) => {
      const processId = process.id ?? nanoid2();
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
        state.processes = omit2(state.processes, processId);
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
          state.processes = omit2(state.processes, process.id);
      });
      return true;
    }
  }))
);

// src/ProcessManager.tsx
import { useCallback as useCallback5 } from "react";

// src/components/Window.tsx
import {
  useCallback as useCallback4,
  memo as memo3
} from "react";
import { useDraggable as useDraggable2 } from "@dnd-kit/core";

// ../../node_modules/@dnd-kit/utilities/dist/utilities.esm.js
import { useMemo, useLayoutEffect, useEffect, useRef, useCallback } from "react";
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
import { useCallback as useCallback3, memo as memo2 } from "react";
import {
  ResizableBox
} from "react-resizable";

// src/components/WindowHeader.tsx
import { memo, useCallback as useCallback2 } from "react";
import { useDraggable } from "@dnd-kit/core";
import { BsSquare } from "react-icons/bs";
import { BiWindows } from "react-icons/bi";
import { AiOutlineLine, AiOutlineClose } from "react-icons/ai";
import { jsx, jsxs } from "react/jsx-runtime";
var WindowHeader = memo(({ id }) => {
  const {
    title,
    isFullscreen,
    icon: Icon
  } = useWindowManager(
    useCallback2(
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
    useCallback2(
      (state) => ({
        deleteWindow: state.delete,
        restoreWindow: state.restore,
        maximizeWindow: state.maximize
      }),
      []
    )
  );
  const { attributes, listeners, setActivatorNodeRef } = useDraggable({
    id
  });
  return /* @__PURE__ */ jsxs("div", {
    className: `flex items-center justify-between flex-shrink-0 w-full h-10 px-4 space-x-3 bg-gray-800 ${isFullscreen ? "" : "rounded-t-md"}`,
    ref: setActivatorNodeRef,
    ...listeners,
    ...attributes,
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center space-x-2 overflow-hidden ",
        children: [
          Icon && /* @__PURE__ */ jsx(Icon, {
            className: "w-5 h-5"
          }),
          /* @__PURE__ */ jsx("span", {
            className: "min-w-0 text-sm font-semibold truncate select-none text-gray-50 ",
            children: title
          })
        ]
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center text-gray-100 space-x-4",
        children: [
          /* @__PURE__ */ jsx("button", {
            children: /* @__PURE__ */ jsx(AiOutlineLine, {
              className: "w-4 h-4"
            })
          }),
          /* @__PURE__ */ jsx("button", {
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
            children: isFullscreen ? /* @__PURE__ */ jsx(BiWindows, {
              className: "w-4 h-4"
            }) : /* @__PURE__ */ jsx(BsSquare, {
              className: "w-3 h-3"
            })
          }),
          /* @__PURE__ */ jsx("button", {
            onMouseDown: (e) => {
              e.stopPropagation();
              e.preventDefault();
            },
            onMouseUp: (e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteWindow(id);
            },
            children: /* @__PURE__ */ jsx(AiOutlineClose, {
              className: "w-4 h-4"
            })
          })
        ]
      })
    ]
  });
});

// src/components/WindowContainer.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var resizeHandles = ["se"];
var handleSize = [8, 8];
var WindowContainer = memo2(({ id, children }) => {
  const { boundingBox, isFullscreen } = useWindowManager(
    useCallback3(
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
    useCallback3(
      (state) => ({
        resizeWindow: state.resize,
        onResizeStart: state.onResizeStart,
        onResizeEnd: state.onResizeEnd
      }),
      [id]
    )
  );
  const handleResizeStart = useCallback3(
    (_, data) => onResizeStart(id),
    [id, onResizeStart]
  );
  const handleResizeStop = useCallback3(
    (_, data) => {
      onResizeEnd(id);
      resizeWindow(id, data.size);
    },
    [id, resizeWindow, onResizeEnd]
  );
  return /* @__PURE__ */ jsx2(ResizableBox, {
    width: (boundingBox == null ? void 0 : boundingBox.width) || 0,
    height: (boundingBox == null ? void 0 : boundingBox.height) || 0,
    resizeHandles: isFullscreen ? [] : resizeHandles,
    handleSize,
    onResizeStart: handleResizeStart,
    onResizeStop: handleResizeStop,
    className: `${isFullscreen ? "transition-[height,width] ease-in duration-[40ms] motion-reduce:transition-none" : "rounded-md"}`,
    children: /* @__PURE__ */ jsxs2("div", {
      className: "flex flex-col w-full h-full",
      children: [
        /* @__PURE__ */ jsx2(WindowHeader, {
          id
        }),
        /* @__PURE__ */ jsx2("div", {
          className: "flex flex-col flex-grow overflow-y-auto",
          children
        })
      ]
    })
  });
});

// src/components/Window.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var Window = memo3(({ id, children }) => {
  const { boundingBox, zIndex, isFullscreen } = useWindowManager(
    useCallback4(
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
    useCallback4(
      (state) => ({
        toForeground: state.toForeground
      }),
      [id]
    )
  );
  const memoizedToForeground = useCallback4(() => toForeground(id), [id]);
  const { setNodeRef, transform } = useDraggable2({
    id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    top: boundingBox == null ? void 0 : boundingBox.y,
    left: boundingBox == null ? void 0 : boundingBox.x,
    zIndex
  };
  return /* @__PURE__ */ jsx3("div", {
    className: `absolute ${isFullscreen ? "transition-[top,left] ease-in duration-[40ms] motion-reduce:transition-none" : "shadow-2xl rounded-b-md"}`,
    ref: setNodeRef,
    style,
    onMouseDown: memoizedToForeground,
    children: /* @__PURE__ */ jsx3(WindowContainer, {
      id,
      children
    })
  });
});

// src/ProcessManager.tsx
import { Fragment, jsx as jsx4 } from "react/jsx-runtime";
var ProcessManager = ({
  processRenderer
}) => {
  const { processes } = useProcessManager(
    useCallback5(
      (state) => ({
        processes: Object.values(state.processes).filter(
          ({ renderer }) => renderer === processRenderer
        )
      }),
      [processRenderer]
    )
  );
  return /* @__PURE__ */ jsx4(Fragment, {
    children: processes.map(({ renderer, rendererId, root: Root }) => {
      if (renderer === "window" && rendererId)
        return /* @__PURE__ */ jsx4(Window, {
          id: rendererId,
          children: /* @__PURE__ */ jsx4(Root, {})
        }, rendererId);
      else if (renderer === "other") {
        return /* @__PURE__ */ jsx4(Root, {});
      }
    })
  });
};

// src/hooks/useProcessManagerMethods.ts
import { useCallback as useCallback6 } from "react";
function useProcessManagerMethods() {
  return useProcessManager(
    useCallback6(
      (state) => ({
        createProcess: state.create,
        deleteProcess: state.delete
      }),
      []
    )
  );
}

// src/WindowManager.tsx
import { useCallback as useCallback7 } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { jsx as jsx5 } from "react/jsx-runtime";
var WindowManager = ({
  onDragEnd,
  ...windowManagerProps
}) => {
  const { moveWindow } = useWindowManager(
    useCallback7((state) => ({ moveWindow: state.move }), [])
  );
  const _onDragEnd = useCallback7(
    (event) => {
      moveWindow(event.active.id, event.delta);
      if (onDragEnd && typeof onDragEnd === "function")
        onDragEnd(event);
    },
    [onDragEnd, moveWindow]
  );
  return /* @__PURE__ */ jsx5(DndContext, {
    modifiers: [restrictToParentElement],
    onDragEnd: _onDragEnd,
    ...windowManagerProps
  });
};

// src/components/Desktop.tsx
import { useDroppable } from "@dnd-kit/core";
import { jsx as jsx6 } from "react/jsx-runtime";
var DesktopID = "__system_desktop__";
var Desktop = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: DesktopID
  });
  return /* @__PURE__ */ jsx6("div", {
    className: "flex flex-grow relative",
    id: "__desktop__",
    ref: setNodeRef,
    children
  });
};

// src/components/Taskbar.tsx
import {
  useCallback as useCallback8,
  useEffect as useEffect2,
  useState
} from "react";
import {
  config
} from "@sysfolio/process-config";
import { compact } from "lodash";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function usePinnedProcesses() {
  if (typeof window === "undefined")
    return [[], () => {
    }];
  const [pinnedProcesses, setPinnedProcesses] = useState([
    "spotify",
    "code"
  ]);
  useEffect2(() => {
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
    useCallback8((state) => Object.values(state.processes), [])
  );
  const { createProcess } = useProcessManager(
    useCallback8(
      (state) => ({
        createProcess: state.create
      }),
      []
    )
  );
  const [pinnedProcesses] = usePinnedProcesses();
  const { toForeground, deleteWindow } = useWindowManager(
    useCallback8(
      (state) => ({
        toForeground: state.toForeground,
        deleteWindow: state.delete
      }),
      []
    )
  );
  return /* @__PURE__ */ jsxs3("div", {
    className: "flex items-center justify-between w-full h-12 max-w-full bg-gray-800",
    children: [
      /* @__PURE__ */ jsxs3("div", {
        className: "flex items-center flex-1 flex-shrink min-w-0 px-1 gap-x-1",
        children: [
          compact(
            pinnedProcesses.map(
              (pinnedProcess) => config.find(({ type }) => type === pinnedProcess)
            )
          ).map((pinnedProcess) => /* @__PURE__ */ jsx7("button", {
            className: "flex items-center rounded px-3 py-2 text-sm font-semibold text-white min-w-0 hover:bg-gray-700",
            onClick: () => createProcess(pinnedProcess),
            children: pinnedProcess.icon && /* @__PURE__ */ jsx7(pinnedProcess.icon, {
              className: "w-5 h-5"
            })
          }, pinnedProcess.type)),
          /* @__PURE__ */ jsx7("span", {
            className: "w-0.5 h-8 !ml-1 bg-gray-600/10"
          }),
          processes.filter(({ renderer }) => renderer === "window").map(({ id, icon: Icon, rendererId }) => /* @__PURE__ */ jsx7("button", {
            className: "flex items-center rounded px-3 text-sm font-semibold text-white bg-gray-700 min-w-0 py-2 border-t-4 border-gray-600",
            onClick: () => toForeground(rendererId),
            children: Icon && /* @__PURE__ */ jsx7(Icon, {
              className: "w-6 h-6"
            })
          }, id))
        ]
      }),
      /* @__PURE__ */ jsx7("div", {
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
import { useCallback as useCallback9 } from "react";
function useWindows() {
  return useWindowManager(
    useCallback9((state) => Object.values(state.windows), [])
  );
}

// src/hooks/useWindowsMethods.ts
import { useCallback as useCallback10 } from "react";
function useWindowsMethods() {
  return useWindowManager(
    useCallback10(
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
import { useCallback as useCallback11 } from "react";
function useWindow(id) {
  return useWindowManager(useCallback11((state) => state.windows[id], [id]));
}
export {
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
};
