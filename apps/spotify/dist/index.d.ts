import React from 'react';

declare type SpotifyProps = {
    id: string;
};
declare const Spotify: React.FC<SpotifyProps>;
declare type SpotifyIconProps = {
    className?: string;
};
declare const SpotifyIcon: React.FC<SpotifyIconProps>;

export { Spotify, SpotifyIcon };
