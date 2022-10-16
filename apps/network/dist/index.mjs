// src/Network.tsx
import { memo } from "react";
import { useNetworkState } from "react-use";
import { AiOutlineDisconnect, AiOutlineWifi } from "react-icons/ai";
import { FaEthernet } from "react-icons/fa";
import classNames from "classnames";
import { jsx, jsxs } from "react/jsx-runtime";
var Network = memo(() => {
  const { online } = useNetworkState();
  return /* @__PURE__ */ jsx("div", {
    children: online ? "Connected" : "Disconnected"
  });
});
var NetworkLabel = memo(() => {
  const { online } = useNetworkState();
  return /* @__PURE__ */ jsx("div", {
    children: online ? "Connected" : "Disconnected"
  });
});
var NetworkDescription = memo(() => {
  const { type, effectiveType, downlink } = useNetworkState();
  console.log(downlink);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col w-48 space-y-1.5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex justify-between space-x-1 font-medium",
        children: [
          /* @__PURE__ */ jsx("span", {
            className: "text-xs text-gray-400",
            children: "Connection type :"
          }),
          /* @__PURE__ */ jsxs("span", {
            className: "text-xs text-gray-200",
            children: [
              type === "wifi" && "Wifi",
              type === "ethernet" && "Ethernet",
              effectiveType
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex justify-between space-x-1 font-medium",
        children: [
          /* @__PURE__ */ jsx("span", {
            className: "text-xs text-gray-400",
            children: "Download speed :"
          }),
          /* @__PURE__ */ jsxs("span", {
            className: "text-xs text-gray-200",
            children: [
              downlink,
              " mb/s"
            ]
          })
        ]
      })
    ]
  });
});
var NetworkIcon = memo(({ className }) => {
  const { online, type } = useNetworkState();
  if (!online)
    return /* @__PURE__ */ jsx(AiOutlineDisconnect, {
      className: classNames("text-gray-100", className)
    });
  if (type === "wifi")
    return /* @__PURE__ */ jsx(AiOutlineWifi, {
      className: classNames("text-gray-100", className)
    });
  if (type === "ethernet")
    return /* @__PURE__ */ jsx(FaEthernet, {
      className: classNames("text-gray-100", className)
    });
  return /* @__PURE__ */ jsx(AiOutlineWifi, {
    className: classNames("text-gray-100", className)
  });
});
export {
  Network,
  NetworkDescription,
  NetworkIcon,
  NetworkLabel
};
