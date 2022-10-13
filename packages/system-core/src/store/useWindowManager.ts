import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { each, maxBy, omit } from "lodash";
import { nanoid } from "nanoid";
import React from "react";
import { useProcessManager } from "./useProcessManager";

type Size = {
  width: number;
  height: number;
};

type Delta = {
  x: number;
  y: number;
};

export type WindowGeometry = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const DEFAULT_WINDOW_GEOMETRY = {
  width: 1000,
  height: 1000,
  x: 0,
  y: 0,
};

export type WindowState = {
  id: string;
  title: string;

  icon?: React.FC<{ className?: string }>;

  zIndex: number;

  isFocused: boolean;
  isResizing: boolean;
  isFullscreen: boolean;

  boundingBox: WindowGeometry;
  previousboundingBox?: WindowGeometry;
};

const DEFAULT_WINDOW_CONSTANTS = {
  title: "Untitled",

  zIndex: 0,

  isFocused: false,
  isResizing: false,
  isFullscreen: false,

  boundingBox: { ...DEFAULT_WINDOW_GEOMETRY },
};

export type WindowManagerState = {
  windows: Record<string, WindowState>;

  create: (
    window: Partial<WindowState>,
    shouldFocus?: boolean
  ) => string | undefined;
  delete: (windowId: string) => boolean;

  move: (windowId: string, delta: Delta) => boolean;
  resize: (windowId: string, size: Size) => boolean;
  onResizeStart: (windowId: string) => void;
  onResizeEnd: (windowId: string) => void;

  focus: (windowId: string) => boolean;
  maximize: (windowId: string) => boolean;
  restore: (windowId: string) => boolean;

  toForeground: (windowId: string, shouldFocus?: boolean) => boolean;
  toBackground: (windowId: string) => boolean;
};

export const useWindowManager = create(
  immer<WindowManagerState>((set, get) => ({
    windows: {},

    create: (window, shouldFocus = true) => {
      const windowId = window.id ?? nanoid();

      if (!!get().windows[windowId]) {
        console.error(
          "Impossible to create a window with the same id as an existing one"
        );
        return undefined;
      }

      set((state) => {
        state.windows[windowId] = {
          ...DEFAULT_WINDOW_CONSTANTS,
          ...window,
          id: windowId,
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
        each(state.windows, (window) => {
          if (window.isFocused && window.id !== windowId) {
            window.isFocused = false;
          } else if (!window.isFocused && window.id === windowId)
            window.isFocused = true;
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
              ...state.windows[windowId].boundingBox,
            };

            state.windows[windowId].boundingBox.width =
              desktopElement.getBoundingClientRect().width;
            state.windows[windowId].boundingBox.height =
              desktopElement.getBoundingClientRect().height;
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
              ...(state.windows[windowId]
                .previousboundingBox as WindowGeometry),
            };
          }
        });

        return true;
      }

      return false;
    },

    toForeground: (windowId, shouldFocus = true) => {
      if (!get().windows[windowId]) {
        console.error("Impossible to place in foreground window ID", windowId);
        return false;
      }

      const highestZIndex =
        maxBy(Object.values(get().windows), "zIndex")?.zIndex ?? 0;

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
    },
  }))
);
