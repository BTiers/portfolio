import React, { memo } from "react";

import classNames from "classnames";

import { SiSpotify } from "react-icons/si";

type SpotifyProps = Record<string, never>;

export const Spotify: React.FC<SpotifyProps> = memo(({}) => {
  return (
    <div className="relative flex flex-col flex-grow rounded-b-md">
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1E37IsbPTPT4F1?utm_source=generator"
        frameBorder="0"
        allow="encrypted-media"
        className="absolute left-0 w-full h-full rounded-b-md"
      ></iframe>
    </div>
  );
});

type SpotifyIconProps = { className?: string };

export const SpotifyIcon: React.FC<SpotifyIconProps> = memo(({ className }) => {
  return <SiSpotify className={classNames("text-[#1db954]", className)} />;
});
