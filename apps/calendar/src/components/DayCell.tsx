import { memo } from "react";

import { format } from "date-fns";
import { useSetAtom } from "jotai";

import { selectedDayAtom } from "./Calendar";
import { Cell } from "./CalendarEntries";

export type DayCellProps = { cell: Cell };

export const DayCell: React.FC<DayCellProps> = memo(({ cell }) => {
  const setSelectedDayAtom = useSetAtom(selectedDayAtom);

  let dayCellClassnames =
    "flex justify-center items-center text-center h-16 w-16 transition font-medium text-base rounded-sm ";

  if (cell.isToday)
    dayCellClassnames += "bg-blue-600 text-white font-medium hover:bg-blue-700";
  else if (cell.isSelected)
    dayCellClassnames +=
      "bg-blue-200 text-blue-900 font-medium hover:bg-blue-300";
  else if (cell.isWithinSelectedMonth)
    dayCellClassnames += "text-gray-100 font-medium hover:bg-gray-700";
  else dayCellClassnames += "text-gray-400 hover:bg-gray-700";

  return (
    <div
      key={cell.index}
      className={dayCellClassnames}
      onClick={() => setSelectedDayAtom(() => cell.date)}
    >
      {format(cell.date, "d")}
    </div>
  );
});
