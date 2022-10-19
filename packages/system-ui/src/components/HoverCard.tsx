import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { PropsWithChildren } from "react";

export const HoverCardTrigger: React.FC<
  RadixHoverCard.HoverCardTriggerProps
> = ({ ...props }) => {
  return <RadixHoverCard.Trigger {...props} />;
};

export const HoverCardRoot = RadixHoverCard.Root;

export const HoverCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RadixHoverCard.Content
      align="center"
      sideOffset={4}
      className={
        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down max-w-sm ml-1 mr-3 rounded-md p-4 bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 z-[9999]"
      }
    >
      <RadixHoverCard.Arrow className="text-gray-800 fill-current" />
      <div className="flex w-full h-full space-x-4">{children}</div>
    </RadixHoverCard.Content>
  );
};
