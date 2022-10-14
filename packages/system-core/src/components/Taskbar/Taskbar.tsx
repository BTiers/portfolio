import React, { FC, PropsWithChildren, useCallback } from "react";

import { compact } from "lodash";

import { useProcessManager } from "../../store/useProcessManager";

import { config } from "@sysfolio/process-config";

import { usePinnedProcesses } from "../../hooks/usePinnedProcesses";
import {
  ProcessStartupLinkHoverCard,
  ProcessStartupSingletonHoverCard,
  WindowRenderedRunningProcessHoverCard,
} from "./ProcessHoverCards";

export type TaskbarProps = PropsWithChildren;

export const Taskbar: FC<TaskbarProps> = ({}) => {
  const processes = useProcessManager(
    useCallback((state) => Object.values(state.processes), [])
  );

  const [pinnedProcesses] = usePinnedProcesses();

  return (
    <div className="flex items-center justify-between w-full h-12 max-w-full bg-gray-800">
      <div className="flex items-center flex-1 flex-shrink min-w-0 px-1 gap-x-1">
        {/* <MainMenu /> */}
        {compact(
          pinnedProcesses.map((pinnedProcess) =>
            config.find(({ type }) => type === pinnedProcess)
          )
        ).map((pinnedProcess) => (
          <ProcessStartupLinkHoverCard
            key={pinnedProcess.type}
            process={pinnedProcess}
          />
        ))}
        <span className="w-0.5 h-8 !ml-1 bg-gray-600/10" />
        {processes
          .filter(({ renderer }) => renderer === "window")
          .map((process) => (
            <WindowRenderedRunningProcessHoverCard
              key={process.id}
              process={process}
            />
          ))}
      </div>
      <div className="flex items-center flex-shrink-0 mr-3 space-x-1">
        {config
          .filter(({ renderer }) => renderer === "popover")
          .map((process) => (
            <ProcessStartupSingletonHoverCard key={process.type} process={process} />
          ))}
      </div>
    </div>
  );
};
