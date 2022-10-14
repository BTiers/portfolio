import { Dispatch, useState, useEffect } from "react";

import { AvailableProcesses } from "@sysfolio/process-config";

export function usePinnedProcesses(): [
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
