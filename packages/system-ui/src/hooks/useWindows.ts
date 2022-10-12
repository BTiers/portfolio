import { useCallback } from "react";

import { useWindowManager, WindowState } from "../store/useWindowManager";

export function useWindows(): WindowState[] {
  return useWindowManager(
    useCallback((state) => Object.values(state.windows), [])
  );
}
