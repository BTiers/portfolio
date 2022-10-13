// src/Code.tsx
import { memo } from "react";
import classNames from "classnames";
import { HiCode } from "react-icons/hi";
import { jsx } from "react/jsx-runtime";
var Code = memo(({}) => {
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex flex-col flex-grow rounded-b-md",
    children: /* @__PURE__ */ jsx("iframe", {
      src: "https://github1s.com/react-hook-form/react-hook-form",
      frameBorder: "0",
      allow: "encrypted-media",
      className: "absolute left-0 w-full h-full rounded-b-md"
    })
  });
});
var CodeIcon = memo(({ className }) => {
  return /* @__PURE__ */ jsx(HiCode, {
    className: classNames("text-blue-500", className)
  });
});
export {
  Code,
  CodeIcon
};
