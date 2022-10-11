import React, {
  PropsWithChildren,
  FC,
  useCallback,
  memo,
  CSSProperties,
} from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { ResizableBox } from "react-resizable";

import { BsSquare } from "react-icons/bs";
import { AiOutlineLine, AiOutlineClose } from "react-icons/ai";

import { useWindowManager } from "./store/useWindowManager";
import { useInitializeWindow } from "./hooks/useInitializeWindow";

export type WindowProps = PropsWithChildren<{
  id: string;
}>;

export const Window: FC<WindowProps> = memo(({ id, children }: WindowProps) => {
  useInitializeWindow({ id });

  const { boundingBox, title, zIndex, isFullscreen } = useWindowManager(
    useCallback(
      (state) => ({
        boundingBox: state.windows[id]?.boundingBox,
        title: state.windows[id]?.title,
        zIndex: state.windows[id]?.zIndex,
        isFullscreen: state.windows[id]?.isFullscreen,
      }),
      [id]
    )
  );

  const { deleteWindow, resizeWindow, moveWindow, toFullScreen } =
    useWindowManager(
      useCallback(
        (state) => ({
          deleteWindow: state.delete,
          resizeWindow: state.resize,
          moveWindow: state.move,
          toFullScreen: state.toFullScreen,
        }),
        []
      )
    );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    top: boundingBox?.y,
    left: boundingBox?.x,
    // width: boundingBox?.width,
    // height: boundingBox?.height,
    zIndex: zIndex,
  };

  return (
    <div className="absolute" ref={setNodeRef} style={style}>
      <ResizableBox
        className="absolute"
        width={boundingBox?.width}
        height={boundingBox?.height}
      >
        <div className="flex flex-col w-full h-full">
          <div
            className={`flex items-center justify-between flex-shrink-0 w-full h-10 px-4 space-x-3 bg-gray-800 ${
              isFullscreen ? "" : "rounded-t-md"
            }`}
            {...listeners}
            {...attributes}
          >
            <div className="flex items-center space-x-3 overflow-hidden ">
              {/* <ApplicationIconDispatch application={app} iconClassNames="w-5 h-5" /> */}
              <span className="min-w-0 text-sm font-semibold truncate cursor-default text-gray-50 pointer-event-none">
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
                  toFullScreen(id);
                }}
              >
                <BsSquare className="w-3 h-3" />
              </button>
              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  deleteWindow(id);
                }}
              >
                <AiOutlineClose className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto rounded-b-md bg-gray-900 text-white">
            {children}
          </div>
        </div>
      </ResizableBox>
    </div>
  );
});
