import React, {
  PropsWithChildren,
  FC,
  useCallback,
  memo,
  CSSProperties,
} from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useWindowManager } from "../store/useWindowManager";
import { WindowContainer } from "./WindowContainer";

export type WindowProps = PropsWithChildren<{
  id: string;
}>;

export const Window: FC<WindowProps> = memo(({ id, children }: WindowProps) => {
  const { boundingBox, zIndex, isFullscreen } = useWindowManager(
    useCallback(
      (state) => ({
        boundingBox: state.windows[id]?.boundingBox,
        zIndex: state.windows[id]?.zIndex,
        isFullscreen: state.windows[id]?.isFullscreen,
      }),
      [id]
    )
  );

  const { toForeground } = useWindowManager(
    useCallback(
      (state) => ({
        toForeground: state.toForeground,
      }),
      [id]
    )
  );

  const memoizedToForeground = useCallback(() => toForeground(id), [id]);

  const { setNodeRef, transform } = useDraggable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    top: boundingBox?.y,
    left: boundingBox?.x,
    zIndex: zIndex,
  };

  return (
    <div
      className={`absolute ${
        isFullscreen
          ? "transition-[top,left] ease-in duration-[40ms] motion-reduce:transition-none"
          : "shadow-2xl rounded-b-md"
      }`}
      ref={setNodeRef}
      style={style}
      onMouseDown={memoizedToForeground}
    >
      <WindowContainer id={id}>{children}</WindowContainer>
    </div>
  );
});
