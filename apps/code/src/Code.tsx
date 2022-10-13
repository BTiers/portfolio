import React, { memo } from "react";

import classNames from "classnames";

import { HiCode } from "react-icons/hi";

type CodeProps = Record<string, never>;

export const Code: React.FC<CodeProps> = memo(({}) => {
  return (
    <div className="relative flex flex-col flex-grow rounded-b-md">
      <iframe
        src="https://github1s.com/react-hook-form/react-hook-form"
        frameBorder="0"
        allow="encrypted-media"
        className="absolute left-0 w-full h-full rounded-b-md"
      ></iframe>
    </div>
  );
});

type CodeIconProps = { className?: string };

export const CodeIcon: React.FC<CodeIconProps> = memo(({ className }) => {
  return <HiCode className={classNames("text-blue-500", className)} />;
});
