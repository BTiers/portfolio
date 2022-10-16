import React from 'react';

declare type BrowserProps = {
    id: string;
};
declare const Browser: React.FC<BrowserProps>;
declare type BrowserIconProps = {
    className?: string;
};
declare const BrowserIcon: React.FC<BrowserIconProps>;

export { Browser, BrowserIcon };
