// src/Spotify.tsx
import { memo } from "react";
import classNames from "classnames";
import { SiSpotify } from "react-icons/si";
import { jsx } from "react/jsx-runtime";
var Spotify = memo(({}) => {
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex flex-col flex-grow rounded-b-md",
    children: /* @__PURE__ */ jsx("iframe", {
      src: "https://open.spotify.com/embed/playlist/37i9dQZF1E37IsbPTPT4F1?utm_source=generator",
      frameBorder: "0",
      allow: "encrypted-media",
      className: "absolute left-0 w-full h-full rounded-b-md"
    })
  });
});
var SpotifyIcon = memo(({ className }) => {
  return /* @__PURE__ */ jsx(SiSpotify, {
    className: classNames("text-[#1db954]", className)
  });
});
export {
  Spotify,
  SpotifyIcon
};
