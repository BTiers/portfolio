import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { nanoid } from "nanoid";
import { omit } from "lodash";

import { ProcessConfig } from "@sysfolio/process-config";
import { useWindowManager } from "./useWindowManager";

export type ProcessManagerState = {
  processes: Record<string, ProcessConfig>;

  create: (process: ProcessConfig) => string | undefined;
  delete: (processId: string) => boolean;
  deleteByRendererId: (processRendererId: string) => boolean;
};

export const useProcessManager = create(
  immer<ProcessManagerState>((set, get) => ({
    processes: {},

    create: (process) => {
      const processId = process.id ?? nanoid();
      let rendererId: string = "";

      if (!!get().processes[processId]) {
        console.error(
          "Impossible to create a process with the same id as an existing one"
        );
        return undefined;
      }

      if (process.renderer === "window") {
        const windowId = useWindowManager
          .getState()
          .create({ id: processId, title: process.name, icon: process.icon });

        if (windowId) rendererId = windowId;
      }

      set((state) => {
        state.processes[processId] = {
          ...process,
          id: processId,
          rendererId,
        };
      });

      return processId;
    },

    delete: (processId) => {
      const process = get().processes[processId];

      if (!process) {
        console.error("Impossible to delete process ID", processId);
        return false;
      }

      if (process.renderer === "window" && process.rendererId) {
        useWindowManager.getState().delete(process.rendererId);
      }

      set((state) => {
        state.processes = omit(state.processes, processId);
      });

      return true;
    },

    deleteByRendererId: (processRendererId) => {
      const process = Object.values(get().processes).find(
        ({ rendererId }) => processRendererId === rendererId
      );

      if (!process) {
        console.error(
          "Impossible to delete process by renderer ID",
          processRendererId
        );
        return false;
      }

      set((state) => {
        if (process.id) state.processes = omit(state.processes, process.id);
      });

      return true;
    },
  }))
);
