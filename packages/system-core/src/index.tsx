export { useProcessManager } from "./store/useProcessManager";
export type { ProcessManagerState } from "./store/useProcessManager";

export { ProcessManager } from "./ProcessManager";

export { useProcessManagerMethods } from "./hooks/useProcessManagerMethods";

export { WindowManager } from "./WindowManager";
export type { WindowManagerProps } from "./WindowManager";

export { Desktop, DesktopID } from "./components/Desktop";
export type { DesktopProps } from "./components/Desktop";

export { Window } from "./components/Window";
export type { WindowProps } from "./components/Window";

export { Taskbar } from "./components/Taskbar/Taskbar";
export type { TaskbarProps } from "./components/Taskbar/Taskbar";

export { LockScreen } from "./components/LockScreen";

export { useWindowManager } from "./store/useWindowManager";
export type {
  WindowManagerState,
  WindowState,
  WindowGeometry,
} from "./store/useWindowManager";

export { useWindows } from "./hooks/useWindows";
export { useWindowsMethods } from "./hooks/useWindowsMethods";
export { useWindow } from "./hooks/useWindow";
