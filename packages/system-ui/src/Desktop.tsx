import React, { FC, PropsWithChildren } from "react";

import { useDroppable } from "@dnd-kit/core";

export const DesktopID = "__system_desktop__";

export type DesktopProps = PropsWithChildren;

export const Desktop: FC<DesktopProps> = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: DesktopID,
  });

  return (
    <div className="flex flex-grow relative" id="__desktop__" ref={setNodeRef}>
      {children}
    </div>
  );
};
