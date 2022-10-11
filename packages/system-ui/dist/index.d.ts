import { FC, PropsWithChildren } from 'react';
import { DndContextProps } from '@dnd-kit/core';
import * as immer_dist_internal from 'immer/dist/internal';
import * as zustand from 'zustand';

declare type WindowManagerProps = DndContextProps;
declare const WindowManager: FC<WindowManagerProps>;

declare const DesktopID = "__system_desktop__";
declare type DesktopProps = PropsWithChildren;
declare const Desktop: FC<DesktopProps>;

declare type WindowProps = PropsWithChildren<{
    id: string;
}>;
declare const Window: FC<WindowProps>;

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
    zIndex: number;
    isFocused: boolean;
    isDragging: boolean;
    isFullscreen: boolean;
    boundingBox: WindowGeometry;
};
declare type WindowManagerState = {
    windows: Record<string, WindowState>;
    create: (window: Partial<WindowState>) => string | undefined;
    delete: (windowId: string) => boolean;
    move: (windowId: string, delta: Delta) => boolean;
    resize: (windowId: string, delta: Delta) => boolean;
    toForeground: (windowId: string) => boolean;
    toBackground: (windowId: string) => boolean;
    toFullScreen: (windowId: string) => boolean;
};
declare const useWindowManager: zustand.UseBoundStore<Omit<zustand.StoreApi<WindowManagerState>, "setState"> & {
    setState(nextStateOrUpdater: WindowManagerState | Partial<WindowManagerState> | ((state: immer_dist_internal.WritableDraft<WindowManagerState>) => void), shouldReplace?: boolean | undefined): void;
}>;

declare function useInitializeWindow(options?: Partial<WindowState>): void;

export { Desktop, DesktopID, DesktopProps, Window, WindowGeometry, WindowManager, WindowManagerProps, WindowManagerState, WindowProps, WindowState, useInitializeWindow, useWindowManager };
