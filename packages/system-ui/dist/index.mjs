// src/WindowManager.tsx
import { useCallback } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

// src/store/useWindowManager.ts
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { maxBy, omit } from "lodash";
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
  isDragging: false,
  isFullscreen: false,
  boundingBox: { ...DEFAULT_WINDOW_GEOMETRY }
};
var useWindowManager = create(
  immer((set, get) => ({
    windows: {},
    create: (window2) => {
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
      return windowId;
    },
    delete: (windowId) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }
      console.log("icii");
      set((state) => {
        console.log(omit(state.windows, windowId));
        state.windows = omit(state.windows, windowId);
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
      const highestZIndex = ((_a = maxBy(Object.values(get().windows), "zIndex")) == null ? void 0 : _a.zIndex) ?? 0;
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
import { jsx } from "react/jsx-runtime";
var WindowManager = ({
  onDragEnd,
  ...windowManagerProps
}) => {
  const moveWindow = useWindowManager(useCallback((state) => state.move, []));
  const _onDragEnd = useCallback(
    (event) => {
      moveWindow(event.active.id, event.delta);
      if (onDragEnd && typeof onDragEnd === "function")
        onDragEnd(event);
    },
    [onDragEnd, moveWindow]
  );
  return /* @__PURE__ */ jsx(DndContext, {
    modifiers: [restrictToParentElement],
    onDragEnd: _onDragEnd,
    ...windowManagerProps
  });
};

// src/Desktop.tsx
import { useDroppable } from "@dnd-kit/core";
import { jsx as jsx2 } from "react/jsx-runtime";
var DesktopID = "__system_desktop__";
var Desktop = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: DesktopID
  });
  return /* @__PURE__ */ jsx2("div", {
    className: "flex flex-grow relative",
    ref: setNodeRef,
    children
  });
};

// src/Window.tsx
import {
  useCallback as useCallback4,
  memo
} from "react";
import { useDraggable } from "@dnd-kit/core";

// ../../node_modules/@dnd-kit/utilities/dist/utilities.esm.js
import { useMemo, useLayoutEffect, useEffect, useRef, useCallback as useCallback2 } from "react";
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
import { ResizableBox } from "react-resizable";
import { BsSquare } from "react-icons/bs";
import { AiOutlineLine, AiOutlineClose } from "react-icons/ai";

// src/hooks/useInitializeWindow.ts
import { useCallback as useCallback3, useEffect as useEffect2 } from "react";
var DEFAULT_OPTIONS = {};
function useInitializeWindow(options = DEFAULT_OPTIONS) {
  const createWindow = useWindowManager(
    useCallback3((state) => state.create, [])
  );
  useEffect2(() => {
    createWindow(options);
  }, []);
}

// src/Window.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var Window = memo(({ id, children }) => {
  useInitializeWindow({ id });
  const { boundingBox, title, zIndex, isFullscreen } = useWindowManager(
    useCallback4(
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
    useCallback4(
      (state) => ({
        deleteWindow: state.delete,
        resizeWindow: state.resize,
        moveWindow: state.move,
        toFullScreen: state.toFullScreen
      }),
      []
    )
  );
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    top: boundingBox == null ? void 0 : boundingBox.y,
    left: boundingBox == null ? void 0 : boundingBox.x,
    zIndex
  };
  return /* @__PURE__ */ jsx3("div", {
    className: "absolute",
    ref: setNodeRef,
    style,
    children: /* @__PURE__ */ jsx3(ResizableBox, {
      className: "absolute",
      width: boundingBox == null ? void 0 : boundingBox.width,
      height: boundingBox == null ? void 0 : boundingBox.height,
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col w-full h-full",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: `flex items-center justify-between flex-shrink-0 w-full h-10 px-4 space-x-3 bg-gray-800 ${isFullscreen ? "" : "rounded-t-md"}`,
            ...listeners,
            ...attributes,
            children: [
              /* @__PURE__ */ jsx3("div", {
                className: "flex items-center space-x-3 overflow-hidden ",
                children: /* @__PURE__ */ jsx3("span", {
                  className: "min-w-0 text-sm font-semibold truncate cursor-default text-gray-50 pointer-event-none",
                  children: title
                })
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-center text-gray-100 space-x-4",
                children: [
                  /* @__PURE__ */ jsx3("button", {
                    children: /* @__PURE__ */ jsx3(AiOutlineLine, {
                      className: "w-4 h-4"
                    })
                  }),
                  /* @__PURE__ */ jsx3("button", {
                    onMouseDown: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toFullScreen(id);
                    },
                    children: /* @__PURE__ */ jsx3(BsSquare, {
                      className: "w-3 h-3"
                    })
                  }),
                  /* @__PURE__ */ jsx3("button", {
                    onMouseDown: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      deleteWindow(id);
                    },
                    children: /* @__PURE__ */ jsx3(AiOutlineClose, {
                      className: "w-4 h-4"
                    })
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ jsx3("div", {
            className: "flex flex-col flex-grow overflow-y-auto rounded-b-md bg-gray-900 text-white",
            children
          })
        ]
      })
    })
  });
});
export {
  Desktop,
  DesktopID,
  Window,
  WindowManager,
  useInitializeWindow,
  useWindowManager
};
