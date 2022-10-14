import React, { memo } from "react";

import classNames from "classnames";

import { SiSpotify } from "react-icons/si";

type SpotifyProps = { id: string };

export const Spotify: React.FC<SpotifyProps> = memo(({ id }) => {
  return (
    <div className="relative flex flex-col flex-grow">
      <iframe
        id={id}
        src="https://open.spotify.com/embed/album/4gyRYbpN8MSXuS2zPwcjQu?utm_source=generator"
        frameBorder="0"
        allow="encrypted-media"
        className="absolute left-0 w-full h-full"
      ></iframe>
    </div>
  );
});

type SpotifyIconProps = { className?: string };

export const SpotifyIcon: React.FC<SpotifyIconProps> = memo(({ className }) => {
  return <SiSpotify className={classNames("text-[#1db954]", className)} />;
});
