import React, { FC, useCallback } from "react";

import { useProcessManager } from "./store/useProcessManager";
import { ProcessRenderer } from "@sysfolio/process-config";

import { Window } from "./components/Window";

export type ProcessManagerProps = {
  processRenderer: ProcessRenderer;
};

export const ProcessManager: FC<ProcessManagerProps> = ({
  processRenderer,
}: ProcessManagerProps) => {
  const { processes } = useProcessManager(
    useCallback(
      (state) => ({
        processes: Object.values(state.processes).filter(
          ({ renderer }) => renderer === processRenderer
        ),
      }),
      [processRenderer]
    )
  );

  return (
    <>
      {processes.map(({ id, rendererId, root: Root }) => {
        if (rendererId)
          return (
            <Window id={rendererId} key={rendererId}>
              <Root id={id!} />
            </Window>
          );
      })}
    </>
  );
};
