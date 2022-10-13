import { useCallback } from "react";

import { useProcessManager } from "../store/useProcessManager";

export function useProcessManagerMethods() {
  return useProcessManager(
    useCallback(
      (state) => ({
        createProcess: state.create,
        deleteProcess: state.delete,
      }),
      []
    )
  );
}
