import React, { PropsWithChildren, FC, useCallback, memo } from "react";

import {
  ResizableBox,
  ResizeCallbackData,
  ResizeHandle,
} from "react-resizable";

import { useWindowManager } from "../store/useWindowManager";

import { WindowHeader } from "./WindowHeader";

const resizeHandles: ResizeHandle[] = ["se"];
const handleSize: [number, number] = [8, 8];

type WindowContainer = PropsWithChildren<{ id: string }>;

export const WindowContainer: FC<WindowContainer> = memo(({ id, children }) => {
  const { boundingBox, isFullscreen } = useWindowManager(
    useCallback(
      (state) => ({
        boundingBox: state.windows[id]?.boundingBox,
        isFullscreen: state.windows[id]?.isFullscreen,
      }),
      [id]
    )
  );

  const { resizeWindow, onResizeStart, onResizeEnd } = useWindowManager(
    useCallback(
      (state) => ({
        resizeWindow: state.resize,
        onResizeStart: state.onResizeStart,
        onResizeEnd: state.onResizeEnd,
      }),
      [id]
    )
  );

  const handleResizeStart = useCallback(
    (_: unknown, data: ResizeCallbackData) => onResizeStart(id),
    [id, onResizeStart]
  );
  const handleResizeStop = useCallback(
    (_: unknown, data: ResizeCallbackData) => {
      onResizeEnd(id);
      resizeWindow(id, data.size);
    },
    [id, resizeWindow, onResizeEnd]
  );

  return (
    <ResizableBox
      width={boundingBox?.width || 0}
      height={boundingBox?.height || 0}
      resizeHandles={isFullscreen ? [] : resizeHandles}
      handleSize={handleSize}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      className={`${
        isFullscreen
          ? "transition-[height,width] ease-in duration-[40ms] motion-reduce:transition-none"
          : "rounded-md"
      }`}
    >
      <div className="flex flex-col w-full h-full">
        <WindowHeader id={id} />
        <div className="flex flex-col flex-grow overflow-y-auto">
          {children}
        </div>
      </div>
    </ResizableBox>
  );
});
