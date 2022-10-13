import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useProcessManager } from "../store/useProcessManager";
import { useWindowManager } from "../store/useWindowManager";

import {
  AvailableProcesses,
  config,
  ProcessConfig,
} from "@sysfolio/process-config";
import { compact } from "lodash";

function usePinnedProcesses(): [
  AvailableProcesses[],
  Dispatch<React.SetStateAction<AvailableProcesses[]>>
] {
  if (typeof window === "undefined") return [[], () => {}];

  const [pinnedProcesses, setPinnedProcesses] = useState<AvailableProcesses[]>([
    "spotify",
    "code",
  ]);

  useEffect(() => {
    setPinnedProcesses(
      JSON.parse(window.localStorage.getItem(`__pinned_tasks__`) || "[]")
    );

    return () =>
      window.localStorage.setItem(
        `__pinned_tasks__`,
        JSON.stringify(pinnedProcesses)
      );
  }, [setPinnedProcesses]);

  return [pinnedProcesses, setPinnedProcesses];
}

export type TaskbarProps = PropsWithChildren;

export const Taskbar: FC<TaskbarProps> = ({}) => {
  const processes = useProcessManager(
    useCallback((state) => Object.values(state.processes), [])
  );
  const { createProcess } = useProcessManager(
    useCallback(
      (state) => ({
        createProcess: state.create,
      }),
      []
    )
  );

  const [pinnedProcesses] = usePinnedProcesses();

  const { toForeground, deleteWindow } = useWindowManager(
    useCallback(
      (state) => ({
        toForeground: state.toForeground,
        deleteWindow: state.delete,
      }),
      []
    )
  );

  return (
    <div className="flex items-center justify-between w-full h-12 max-w-full bg-gray-800">
      <div className="flex items-center flex-1 flex-shrink min-w-0 px-1 gap-x-1">
        {/* <MainMenu /> */}
        {compact(
          pinnedProcesses.map((pinnedProcess) =>
            config.find(({ type }) => type === pinnedProcess)
          )
        ).map((pinnedProcess) => (
          <button
            key={pinnedProcess.type}
            className="flex items-center rounded px-3 py-2 text-sm font-semibold text-white min-w-0 hover:bg-gray-700"
            onClick={() => createProcess(pinnedProcess)}
          >
            {pinnedProcess.icon && <pinnedProcess.icon className="w-5 h-5" />}
          </button>
        ))}
        <span className="w-0.5 h-8 !ml-1 bg-gray-600/10" />
        {processes
          .filter(({ renderer }) => renderer === "window")
          .map(({ id, icon: Icon, rendererId }) => (
            <button
              key={id}
              className="flex items-center rounded px-3 text-sm font-semibold text-white bg-gray-700 min-w-0 py-2 border-t-4 border-gray-600"
              onClick={() => toForeground(rendererId!)}
            >
              {Icon && <Icon className="w-6 h-6" />}
            </button>
          ))}
      </div>
      <div className="flex items-center flex-shrink-0 mr-3 space-x-1">
        {/* <Brightness />
        <Network />
        <Clock /> */}
      </div>
    </div>
  );
};
