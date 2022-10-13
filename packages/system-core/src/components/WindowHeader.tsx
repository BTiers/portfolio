import React, { memo, useCallback } from "react";

import { useDraggable } from "@dnd-kit/core";

import { BsSquare } from "react-icons/bs";
import { BiWindows } from "react-icons/bi";
import { AiOutlineLine, AiOutlineClose } from "react-icons/ai";

import { useWindowManager } from "../../../system-core/src/store/useWindowManager";

type WindowHeaderProps = { id: string };

export const WindowHeader: React.FC<WindowHeaderProps> = memo(({ id }) => {
  const {
    title,
    isFullscreen,
    icon: Icon,
  } = useWindowManager(
    useCallback(
      (state) => ({
        title: state.windows[id]?.title,
        isFullscreen: state.windows[id]?.isFullscreen,
        icon: state.windows[id]?.icon,
      }),
      [id]
    )
  );

  const { deleteWindow, restoreWindow, maximizeWindow } = useWindowManager(
    useCallback(
      (state) => ({
        deleteWindow: state.delete,
        restoreWindow: state.restore,
        maximizeWindow: state.maximize,
      }),
      []
    )
  );

  const { attributes, listeners, setActivatorNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      className={`flex items-center justify-between flex-shrink-0 w-full h-10 px-4 space-x-3 bg-gray-800 ${
        isFullscreen ? "" : "rounded-t-md"
      }`}
      ref={setActivatorNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center space-x-2 overflow-hidden ">
        {Icon && <Icon className="w-5 h-5" />}
        <span className="min-w-0 text-sm font-semibold truncate select-none text-gray-50 ">
          {title}
        </span>
      </div>
      <div className="flex items-center text-gray-100 space-x-4">
        <button>
          <AiOutlineLine className="w-4 h-4" />
        </button>
        <button
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            e.preventDefault();

            if (isFullscreen) restoreWindow(id);
            else maximizeWindow(id);
          }}
        >
          {isFullscreen ? (
            <BiWindows className="w-4 h-4" />
          ) : (
            <BsSquare className="w-3 h-3" />
          )}
        </button>
        <button
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            e.preventDefault();
            deleteWindow(id);
          }}
        >
          <AiOutlineClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
