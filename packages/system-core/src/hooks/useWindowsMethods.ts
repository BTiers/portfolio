import { useCallback } from "react";

import { useWindowManager } from "../store/useWindowManager";

export function useWindowsMethods() {
  return useWindowManager(
    useCallback(
      (state) => ({
        createWindow: state.create,
        deleteWindow: state.delete,
        moveWindow: state.move,
      }),
      []
    )
  );
}
