import React, { FC, useCallback, useEffect, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";

import {
  HoverCardRoot,
  HoverCard,
  HoverCardTrigger,
  PopoverRoot,
  PopoverTrigger,
  Popover,
} from "@sysfolio/system-ui";
import { ProcessConfig } from "@sysfolio/process-config";

import { useWindowManager } from "../../store/useWindowManager";
import { useProcessManager } from "../../store/useProcessManager";

import { useProcessScreenshot } from "../../hooks/useProcessScreenshot";

export type WindowRenderedRunningProcessHoverCardProps = {
  process: ProcessConfig;
};

export const WindowRenderedRunningProcessHoverCard: FC<
  WindowRenderedRunningProcessHoverCardProps
> = ({ process }) => {
  const { miniature, takeScreenshot } = useProcessScreenshot(process.id);
  const { isMinimized } = useWindowManager(
    useCallback(
      (state) => ({
        isMinimized: state.windows[process.rendererId!]?.isMinimized || false,
      }),
      []
    )
  );
  const { toForeground, deleteWindow } = useWindowManager(
    useCallback(
      (state) => ({
        toForeground: state.toForeground,
        deleteWindow: state.delete,
      }),
      []
    )
  );

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (isMinimized || open === false) return;
      takeScreenshot();
    },
    [isMinimized]
  );

  useEffect(() => {
    // Avoid needing the user to hover the card once before first shot is take
    if (process.rendererId) takeScreenshot();
  }, [process.rendererId, takeScreenshot]);

  if (!process.id) return null;

  return (
    <HoverCardRoot onOpenChange={onOpenChange}>
      <HoverCardTrigger asChild>
        <button
          key={process.id}
          className="flex items-center min-w-0 px-3 py-2 text-sm font-semibold text-white bg-gray-700 border-t-4 border-gray-600 rounded"
          onClick={() => toForeground(process.rendererId!)}
        >
          {process.icon && <process.icon className="w-6 h-6" />}
        </button>
      </HoverCardTrigger>
      <HoverCard>
        <div className="relative">
          <button
            type="button"
            className="absolute -top-0.5 -right-2 inline-flex items-center rounded-full border border-transparent bg-red-600 p-0.5 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1"
            onClick={() => deleteWindow(process.rendererId!)}
          >
            <IoCloseOutline className="w-4 h-4" aria-hidden="true" />
          </button>
          <h3 className="text-sm font-medium text-gray-100">{process.name}</h3>
          {process.description && (
            <p className="mt-1 text-sm font-normal text-gray-400">
              {process.description}
            </p>
          )}
          {miniature && (
            <img
              onClick={() => toForeground(process.rendererId!)}
              src={miniature}
              className="my-3 rounded-sm hover:ring-1 hover:ring-blue-500 focus:ring-1 focus:ring-blue-500"
              alt="Process miniature"
            />
          )}
        </div>
      </HoverCard>
    </HoverCardRoot>
  );
};

export type ProcessStartupLinkHoverCardProps = { process: ProcessConfig };

export const ProcessStartupLinkHoverCard: FC<
  ProcessStartupLinkHoverCardProps
> = ({ process }) => {
  const { createProcess } = useProcessManager(
    useCallback(
      (state) => ({
        createProcess: state.create,
      }),
      []
    )
  );

  const onProcessCreate = useCallback(() => {
    createProcess(process);
  }, [createProcess, process]);

  return (
    <HoverCardRoot>
      <HoverCardTrigger asChild>
        <button
          className="flex items-center min-w-0 px-3 py-2 text-sm font-semibold text-white rounded hover:bg-gray-700 focus:bg-gray-700"
          onClick={onProcessCreate}
        >
          {process.icon && <process.icon className="w-5 h-5" />}
          {!process.icon &&
            (process.dynamicName ? <process.dynamicName /> : process.name)}
        </button>
      </HoverCardTrigger>
      <HoverCard>
        <div>
          <h3 className="text-sm font-medium text-gray-100">
            {process.dynamicName ? <process.dynamicName /> : process.name}
          </h3>
          {process.description && (
            <p className="mt-1 text-sm font-normal text-gray-400">
              {process.dynamicDescription ? (
                <process.dynamicDescription />
              ) : (
                process.description
              )}
            </p>
          )}
        </div>
      </HoverCard>
    </HoverCardRoot>
  );
};

export type ProcessStartupSingletonHoverCardProps = { process: ProcessConfig };

export const ProcessStartupSingletonHoverCard: FC<
  ProcessStartupLinkHoverCardProps
> = ({ process }) => {
  const [processId, setProcessId] = useState<string | undefined>();
  const { processes } = useProcessManager(
    useCallback(
      (state) => ({
        processes: state.processes,
      }),
      []
    )
  );
  const { createProcess, deleteProcess } = useProcessManager(
    useCallback(
      (state) => ({
        createProcess: state.create,
        deleteProcess: state.delete,
      }),
      []
    )
  );

  const onProcessCreate = useCallback(() => {
    if (Object.values(processes).some(({ type }) => type === process.type))
      return;

    setProcessId(createProcess(process));
  }, [createProcess, processes, process]);

  if (processId)
    return (
      <PopoverRoot
        defaultOpen
        onOpenChange={(open) => {
          if (!open) {
            deleteProcess(processId);
            setProcessId(undefined);
          }
        }}
      >
        <PopoverTrigger asChild>
          <button
            className="flex items-center min-w-0 px-3 py-2 text-sm font-semibold text-white rounded hover:bg-gray-700 focus:bg-gray-700"
            onClick={onProcessCreate}
          >
            {process.icon && <process.icon className="w-5 h-5" />}
            {!process.icon &&
              (process.dynamicName ? <process.dynamicName /> : process.name)}
          </button>
        </PopoverTrigger>
        <Popover>
          <process.root id={processId} />
        </Popover>
      </PopoverRoot>
    );

  return (
    <HoverCardRoot>
      <HoverCardTrigger asChild>
        <button
          className="flex items-center min-w-0 px-3 py-2 text-sm font-semibold text-white rounded hover:bg-gray-700 focus:bg-gray-700"
          onClick={onProcessCreate}
        >
          {process.icon && <process.icon className="w-5 h-5" />}
          {!process.icon &&
            (process.dynamicName ? <process.dynamicName /> : process.name)}
        </button>
      </HoverCardTrigger>
      <HoverCard>
        <div>
          <h3 className="text-sm font-medium text-gray-100">
            {process.dynamicName ? <process.dynamicName /> : process.name}
          </h3>
          {process.description && (
            <p className="mt-1 text-sm font-normal text-gray-400">
              {process.dynamicDescription ? (
                <process.dynamicDescription />
              ) : (
                process.description
              )}
            </p>
          )}
        </div>
      </HoverCard>
    </HoverCardRoot>
  );
};
