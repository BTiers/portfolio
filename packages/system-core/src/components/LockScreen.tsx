import React, { FC } from "react";
import { useIdle } from "react-use";

export type LockScreenProps = Record<string, never>;

export const LockScreen: FC<LockScreenProps> = ({ children }) => {
  //   const isInactive = useIdle(60e3, undefined, {});
  //   const screenshot = useScreen

  //   if (!isInactive) return null;

  //   return (
  //     <div className="absolute h-screen w-screen backdrop-blur-[5px] bg-[#fff] opacity-[.15] z-[999999]">
  //       {children}
  //     </div>
  //   );

  return null;
};
