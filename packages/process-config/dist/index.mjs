// src/index.ts
import { Spotify, SpotifyIcon } from "@sysfolio/spotify";
import { Code, CodeIcon } from "@sysfolio/code";
import {
  Calendar,
  CalendarLabel,
  CalendarDescription
} from "@sysfolio/calendar";
var AvailableProcessesArray = ["spotify", "code", "calendar"];
var config = [
  {
    type: "spotify",
    renderer: "window",
    name: "Spotify",
    description: "A Spotify web player inside of an IFrame",
    icon: SpotifyIcon,
    root: Spotify
  },
  {
    type: "code",
    renderer: "window",
    name: "Code",
    description: "A Github1s instance inside of an IFrame",
    icon: CodeIcon,
    root: Code
  },
  {
    type: "calendar",
    renderer: "popover",
    name: "Calendar",
    dynamicName: CalendarLabel,
    description: "A basic calendar",
    dynamicDescription: CalendarDescription,
    icon: void 0,
    root: Calendar
  }
];
export {
  AvailableProcessesArray,
  config
};
