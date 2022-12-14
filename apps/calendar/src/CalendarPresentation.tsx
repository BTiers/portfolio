import React, { memo, useState } from "react";

import { format } from "date-fns";

import { useInterval } from "react-use";

const FIVE_SECOND = 5e3;

export const CalendarLabel: React.FC = memo(() => {
  const [time, setTime] = useState(new Date());

  useInterval(() => setTime(new Date()), FIVE_SECOND);

  return (
    <div className="flex items-center font-normal text-xs text-gray-100 space-x-1">
      <span className="text-gray-200">{format(time, "M/dd/yyyy")}</span>
      <span className="font-medium">{format(time, "HH:mm")}</span>
    </div>
  );
});

export const CalendarDescription: React.FC = memo(() => {
  const [time, setTime] = useState(new Date());

  useInterval(() => setTime(new Date()), FIVE_SECOND);

  return <>{format(time, "PPP")}</>;
});
