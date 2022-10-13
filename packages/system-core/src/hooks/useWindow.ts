import { useCallback } from "react";

import { useWindowManager, WindowState } from "../store/useWindowManager";

export function useWindow(id: string): WindowState {
  return useWindowManager(useCallback((state) => state.windows[id], [id]));
}
