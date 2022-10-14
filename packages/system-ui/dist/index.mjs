// src/components/HoverCard.tsx
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { jsx, jsxs } from "react/jsx-runtime";
var HoverCardTrigger = ({ ...props }) => {
  return /* @__PURE__ */ jsx(RadixHoverCard.Trigger, {
    ...props
  });
};
var HoverCardRoot = RadixHoverCard.Root;
var HoverCard = ({ children }) => {
  return /* @__PURE__ */ jsxs(RadixHoverCard.Content, {
    align: "center",
    sideOffset: 4,
    className: "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down max-w-sm ml-1 mr-3 rounded-md p-4 bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
    children: [
      /* @__PURE__ */ jsx(RadixHoverCard.Arrow, {
        className: "fill-current text-gray-800"
      }),
      /* @__PURE__ */ jsx("div", {
        className: "flex h-full w-full space-x-4",
        children
      })
    ]
  });
};

// src/components/Popover.tsx
import * as RadixPopover from "@radix-ui/react-popover";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PopoverTrigger = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx2(RadixPopover.Trigger, {
    ...props
  });
};
var PopoverRoot = RadixPopover.Root;
var Popover = ({ children }) => {
  return /* @__PURE__ */ jsxs2(RadixPopover.Content, {
    align: "center",
    sideOffset: 4,
    className: "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down rounded-md p-4 mx-4 shadow-md bg-gray-800",
    children: [
      /* @__PURE__ */ jsx2(RadixPopover.Arrow, {
        className: "fill-current text-gray-800"
      }),
      /* @__PURE__ */ jsx2("div", {
        className: "flex h-full w-full space-x-4",
        children
      })
    ]
  });
};
export {
  HoverCard,
  HoverCardRoot,
  HoverCardTrigger,
  Popover,
  PopoverRoot,
  PopoverTrigger
};
