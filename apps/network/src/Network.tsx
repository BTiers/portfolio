import React, { memo } from "react";

import { format } from "date-fns";

import { useNetworkState } from "react-use";

import { AiOutlineDisconnect, AiOutlineWifi } from "react-icons/ai";
import { FaEthernet } from "react-icons/fa";
import classNames from "classnames";

export const Network: React.FC = memo(() => {
  const { online } = useNetworkState();

  return <div>{online ? "Connected" : "Disconnected"}</div>;
});

export const NetworkLabel: React.FC = memo(() => {
  const { online } = useNetworkState();

  return <div>{online ? "Connected" : "Disconnected"}</div>;
});

export const NetworkDescription: React.FC = memo(() => {
  const { type, effectiveType, downlink } = useNetworkState();

  console.log(downlink);

  return (
    <div className="flex flex-col w-48 space-y-1.5">
      <div className="flex justify-between space-x-1 font-medium">
        <span className="text-xs text-gray-400">Connection type :</span>
        <span className="text-xs text-gray-200">
          {type === "wifi" && "Wifi"}
          {type === "ethernet" && "Ethernet"}
          {effectiveType}
        </span>
      </div>
      <div className="flex justify-between space-x-1 font-medium">
        <span className="text-xs text-gray-400">Download speed :</span>
        <span className="text-xs text-gray-200">
          {downlink} mb/s
        </span>
      </div>
    </div>
  );
});

type NetworkIconProps = { className?: string };

export const NetworkIcon: React.FC<NetworkIconProps> = memo(({ className }) => {
  const { online, type } = useNetworkState();

  if (!online)
    return (
      <AiOutlineDisconnect className={classNames("text-gray-100", className)} />
    );

  if (type === "wifi")
    return <AiOutlineWifi className={classNames("text-gray-100", className)} />;

  if (type === "ethernet")
    return <FaEthernet className={classNames("text-gray-100", className)} />;

  return <AiOutlineWifi className={classNames("text-gray-100", className)} />;
});
