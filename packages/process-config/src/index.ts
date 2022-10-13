import { Spotify, SpotifyIcon } from "@sysfolio/spotify";
import { Code, CodeIcon } from "@sysfolio/code";

export type ProcessRenderer = "window" | "other";

export const AvailableProcessesArray = ["spotify", "code"] as const;
export type AvailableProcesses = typeof AvailableProcessesArray[number];

export type ProcessConfig = {
  id?: string;
  rendererId?: string;

  type: AvailableProcesses;
  renderer: ProcessRenderer;

  name: string;
  description?: string;
  icon?: React.FC<{ className?: string }>;

  root: React.FC;
};

export const config: ProcessConfig[] = [
  {
    type: "spotify",
    renderer: "window",

    name: "Spotify",
    description: "A Spotify web player inside of an IFrame",
    icon: SpotifyIcon,

    root: Spotify,
  },
  {
    type: "code",
    renderer: "window",

    name: "Code",
    description: "A Github1s instance inside of an IFrame",
    icon: CodeIcon,

    root: Code,
  },
];
