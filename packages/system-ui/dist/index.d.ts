import * as react from 'react';
import { PropsWithChildren } from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import * as RadixPopover from '@radix-ui/react-popover';

declare const HoverCardTrigger: React.FC<RadixHoverCard.HoverCardTriggerProps>;
declare const HoverCardRoot: react.FC<RadixHoverCard.HoverCardProps>;
declare const HoverCard: React.FC<PropsWithChildren>;

declare const PopoverTrigger: React.FC<RadixPopover.PopoverTriggerProps>;
declare const PopoverRoot: react.FC<RadixPopover.PopoverProps>;
declare const Popover: React.FC<PropsWithChildren>;

export { HoverCard, HoverCardRoot, HoverCardTrigger, Popover, PopoverRoot, PopoverTrigger };
