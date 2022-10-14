import { useCallback, useState } from "react";

import { toCanvas } from "html-to-image";

import { useProcessManager } from "../store/useProcessManager";
import { useWindowManager } from "../store/useWindowManager";

export function useProcessScreenshot(processId?: string) {
  const [src, setSrc] = useState<string | null>(null);

  const takeScreenshot = useCallback(async () => {
    try {
      if (!processId) return;

      const process = useProcessManager.getState().processes[processId];

      if (!process?.rendererId || process.renderer !== "window") return;

      const element = document.getElementById(processId);

      if (!element || element.tagName === "IFRAME") return;

      const canvas = await toCanvas(element);
      setSrc(canvas.toDataURL());
    } catch {
      console.error("Unable to generate preview");
    }
  }, [processId]);

  return { miniature: src, takeScreenshot };
}
