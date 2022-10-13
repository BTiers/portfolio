import * as immer_dist_internal from 'immer/dist/internal';
import * as zustand from 'zustand';
import * as _sysfolio_process_config from '@sysfolio/process-config';
import { ProcessConfig, ProcessRenderer } from '@sysfolio/process-config';
import React, { FC, PropsWithChildren } from 'react';
import { DndContextProps } from '@dnd-kit/core';

declare type ProcessManagerState = {
    processes: Record<string, ProcessConfig>;
    create: (process: ProcessConfig) => string | undefined;
    delete: (processId: string) => boolean;
    deleteByRendererId: (processRendererId: string) => boolean;
};
declare const useProcessManager: zustand.UseBoundStore<Omit<zustand.StoreApi<ProcessManagerState>, "setState"> & {
    setState(nextStateOrUpdater: ProcessManagerState | Partial<ProcessManagerState> | ((state: immer_dist_internal.WritableDraft<ProcessManagerState>) => void), shouldReplace?: boolean | undefined): void;
}>;

declare type ProcessManagerProps = {
    processRenderer: ProcessRenderer;
};
declare const ProcessManager: FC<ProcessManagerProps>;

declare function useProcessManagerMethods(): {
    createProcess: (process: _sysfolio_process_config.ProcessConfig) => string | undefined;
    deleteProcess: (processId: string) => boolean;
};

declare type WindowManagerProps = DndContextProps;
declare const WindowManager: FC<WindowManagerProps>;

declare const DesktopID = "__system_desktop__";
declare type DesktopProps = PropsWithChildren;
declare const Desktop: FC<DesktopProps>;

declare type WindowProps = PropsWithChildren<{
    id: string;
}>;
declare const Window: FC<WindowProps>;

declare type TaskbarProps = PropsWithChildren;
declare const Taskbar: FC<TaskbarProps>;

declare type LockScreenProps = Record<string, never>;
declare const LockScreen: FC<LockScreenProps>;

declare type Size = {
    width: number;
    height: number;
};
declare type Delta = {
    x: number;
    y: number;
};
declare type WindowGeometry = {
    width: number;
    height: number;
    x: number;
    y: number;
};
declare type WindowState = {
    id: string;
    title: string;
    icon?: React.FC<{
        className?: string;
    }>;
    zIndex: number;
    isFocused: boolean;
    isResizing: boolean;
    isFullscreen: boolean;
    boundingBox: WindowGeometry;
    previousboundingBox?: WindowGeometry;
};
declare type WindowManagerState = {
    windows: Record<string, WindowState>;
    create: (window: Partial<WindowState>, shouldFocus?: boolean) => string | undefined;
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
declare const useWindowManager: zustand.UseBoundStore<Omit<zustand.StoreApi<WindowManagerState>, "setState"> & {
    setState(nextStateOrUpdater: WindowManagerState | Partial<WindowManagerState> | ((state: immer_dist_internal.WritableDraft<WindowManagerState>) => void), shouldReplace?: boolean | undefined): void;
}>;

declare function useWindows(): WindowState[];

declare function useWindowsMethods(): {
    createWindow: (window: Partial<WindowState>, shouldFocus?: boolean | undefined) => string | undefined;
    deleteWindow: (windowId: string) => boolean;
    moveWindow: (windowId: string, delta: {
        x: number;
        y: number;
    }) => boolean;
};

declare function useWindow(id: string): WindowState;

export { Desktop, DesktopID, DesktopProps, LockScreen, ProcessManager, ProcessManagerState, Taskbar, TaskbarProps, Window, WindowGeometry, WindowManager, WindowManagerProps, WindowManagerState, WindowProps, WindowState, useProcessManager, useProcessManagerMethods, useWindow, useWindowManager, useWindows, useWindowsMethods };
