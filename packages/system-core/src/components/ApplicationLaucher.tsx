import { FC, PropsWithChildren } from "react";

import { Popover, PopoverRoot, PopoverTrigger } from "@sysfolio/system-ui";
import { SysfolioIcon } from "./SysfolioIcon";

export type ApplicationLaucherProps = PropsWithChildren;

export const ApplicationLaucher: FC<ApplicationLaucherProps> = ({
  children,
}) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button className="flex items-center min-w-0 px-3 py-2 text-sm font-semibold text-white rounded hover:bg-gray-700 focus:bg-gray-700">
          <SysfolioIcon className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <Popover>
        <div></div>
      </Popover>
    </PopoverRoot>
  );
};
