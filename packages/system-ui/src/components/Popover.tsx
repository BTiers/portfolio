import { PropsWithChildren } from "react";

import * as RadixPopover from "@radix-ui/react-popover";

export const PopoverTrigger: React.FC<RadixPopover.PopoverTriggerProps> = ({
  ...props
}) => {
  return <RadixPopover.Trigger {...props} />;
};

export const PopoverRoot = RadixPopover.Root;

export const Popover: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RadixPopover.Content
      align="center"
      sideOffset={6}
      className={
        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down rounded-t-sm p-4 shadow-md bg-gray-800"
      }
    >
      <div className="flex h-full w-full space-x-4">{children}</div>
    </RadixPopover.Content>
  );
};
