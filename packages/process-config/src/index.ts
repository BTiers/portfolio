import { Spotify, SpotifyIcon } from "@sysfolio/spotify";
import { Code, CodeIcon } from "@sysfolio/code";
import {
  Calendar,
  CalendarLabel,
  CalendarDescription,
} from "@sysfolio/calendar";

export type ProcessRenderer = "window" | "popover";

export const AvailableProcessesArray = ["spotify", "code", "calendar"] as const;
export type AvailableProcesses = typeof AvailableProcessesArray[number];

export type ProcessConfig = {
  id?: string;
  rendererId?: string;

  type: AvailableProcesses;
  renderer: ProcessRenderer;

  name: string;
  dynamicName?: React.FC<any>;
  description?: string;
  dynamicDescription?: React.FC<any>;
  icon?: React.FC<{ className?: string }>;

  root: React.FC<{ id: string }>;
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
  {
    type: "calendar",
    renderer: "popover",

    name: "Calendar",
    dynamicName: CalendarLabel,

    description: "A basic calendar",
    dynamicDescription: CalendarDescription,

    icon: undefined,

    root: Calendar,
  },
];
