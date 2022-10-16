// src/index.ts
import { Spotify, SpotifyIcon } from "@sysfolio/spotify";
import { Code, CodeIcon } from "@sysfolio/code";
import { Browser, BrowserIcon } from "@sysfolio/browser";
import {
  Network,
  NetworkIcon,
  NetworkLabel,
  NetworkDescription
} from "@sysfolio/network";
import {
  Calendar,
  CalendarLabel,
  CalendarDescription
} from "@sysfolio/calendar";
var AvailableProcessesArray = [
  "spotify",
  "code",
  "calendar",
  "browser",
  "network"
];
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
    type: "browser",
    renderer: "window",
    name: "Brave",
    description: "A poorly featured Brave browser",
    icon: BrowserIcon,
    root: Browser
  },
  {
    type: "network",
    renderer: "popover",
    name: "Network",
    dynamicName: NetworkLabel,
    description: "Informations about the network",
    dynamicDescription: NetworkDescription,
    icon: NetworkIcon,
    root: Network
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
