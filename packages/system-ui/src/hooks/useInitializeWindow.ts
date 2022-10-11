import { useCallback, useEffect } from "react";

import { useWindowManager, WindowState } from "../store/useWindowManager";

const DEFAULT_OPTIONS = {};

export function useInitializeWindow(
  options: Partial<WindowState> = DEFAULT_OPTIONS
) {
  const createWindow = useWindowManager(
    useCallback((state) => state.create, [])
  );

  useEffect(() => {
    createWindow(options);
  }, []);
}
