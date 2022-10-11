import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { maxBy, omit } from "lodash";
import { nanoid } from "nanoid";

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

  zIndex: number;

  isFocused: boolean;
  isDragging: boolean;
  isFullscreen: boolean;

  boundingBox: WindowGeometry;
};

const DEFAULT_WINDOW_CONSTANTS = {
  title: "Untitled",

  zIndex: 0,

  isFocused: false,
  isDragging: false,
  isFullscreen: false,

  boundingBox: { ...DEFAULT_WINDOW_GEOMETRY },
};

export type WindowManagerState = {
  windows: Record<string, WindowState>;

  create: (window: Partial<WindowState>) => string | undefined;
  delete: (windowId: string) => boolean;

  move: (windowId: string, delta: Delta) => boolean;
  resize: (windowId: string, delta: Delta) => boolean;

  toForeground: (windowId: string) => boolean;
  toBackground: (windowId: string) => boolean;
  toFullScreen: (windowId: string) => boolean;
};

export const useWindowManager = create(
  immer<WindowManagerState>((set, get) => ({
    windows: {},

    create: (window) => {
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
      if (!get().windows[windowId]) {
        console.error("Impossible to find window ID", windowId);
        return false;
      }

      const highestZIndex =
        maxBy(Object.values(get().windows), "zIndex")?.zIndex ?? 0;

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
    },
  }))
);
