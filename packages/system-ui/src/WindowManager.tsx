import React, { FC, useCallback } from "react";

import { DndContext, DndContextProps, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useWindowManager } from "./store/useWindowManager";

export type WindowManagerProps = DndContextProps;

export const WindowManager: FC<WindowManagerProps> = ({
  // onDragStart,
  // onDragMove,
  // onDragOver,
  onDragEnd,
  // onDragCancel,
  ...windowManagerProps
}: WindowManagerProps) => {
  const { moveWindow } = useWindowManager(
    useCallback((state) => ({ moveWindow: state.move }), [])
  );

  const _onDragEnd = useCallback(
    (event: DragEndEvent) => {
      moveWindow(event.active.id as string, event.delta);

      if (onDragEnd && typeof onDragEnd === "function") onDragEnd(event);
    },
    [onDragEnd, moveWindow]
  );

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      
      onDragEnd={_onDragEnd}
      {...windowManagerProps}
    />
  );
};
