// src/Spotify.tsx
import { memo } from "react";
import classNames from "classnames";
import { SiSpotify } from "react-icons/si";
import { jsx } from "react/jsx-runtime";
var Spotify = memo(({ id }) => {
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex flex-col flex-grow",
    children: /* @__PURE__ */ jsx("iframe", {
      id,
      src: "https://open.spotify.com/embed/album/4gyRYbpN8MSXuS2zPwcjQu?utm_source=generator",
      frameBorder: "0",
      allow: "encrypted-media",
      className: "absolute left-0 w-full h-full"
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
