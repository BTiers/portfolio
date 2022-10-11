export { WindowManager } from "./WindowManager";
export type { WindowManagerProps } from "./WindowManager";

export { Desktop, DesktopID } from "./Desktop";
export type { DesktopProps } from "./Desktop";

export { Window } from "./Window";
export type { WindowProps } from "./Window";

export { useWindowManager } from "./store/useWindowManager";
export type {
  WindowManagerState,
  WindowState,
  WindowGeometry,
} from "./store/useWindowManager";

export { useInitializeWindow } from "./hooks/useInitializeWindow";