// src/index.ts
import { Spotify, SpotifyIcon } from "@sysfolio/spotify";
import { Code, CodeIcon } from "@sysfolio/code";
var AvailableProcessesArray = ["spotify", "code"];
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
  }
];
export {
  AvailableProcessesArray,
  config
};
