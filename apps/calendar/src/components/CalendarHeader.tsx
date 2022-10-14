import { memo } from "react";

import { addMonths, format, subMonths } from "date-fns";
import { atom, useAtom, useSetAtom } from "jotai";

import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

import { selectedMonthAtom, selectedDayAtom } from "./Calendar";

export const formattedSelectedMonthAtom = atom((get) =>
  format(get(selectedMonthAtom), "MMMM, yyy")
);

export const CalendarHeader: React.FC = memo(() => {
  const [formattedSelectedMonth] = useAtom(formattedSelectedMonthAtom);
  const setSelectedMonthAtom = useSetAtom(selectedMonthAtom);
  const setSelectedDayAtom = useSetAtom(selectedDayAtom);

  return (
    <div className="text-base font-medium text-gray-100 flex justify-between">
      {formattedSelectedMonth}
      <div className="shrink-0 space-x-2 flex items-center">
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-transparent bg-gray-800 p-1 text-white shadow-sm hover:text-blue-500 focus:outline-none focus:text-blue-500"
          onClick={() => setSelectedMonthAtom((prev) => subMonths(prev, 1))}
        >
          <AiOutlineCaretLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-transparent bg-gray-800 p-1 text-white shadow-sm hover:text-blue-500 focus:outline-none focus:text-blue-500"
          onClick={() => {
            setSelectedDayAtom(new Date());
            setSelectedMonthAtom(new Date());
          }}
        >
          Today
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-transparent bg-gray-800 p-1 text-white shadow-sm hover:text-blue-500 focus:outline-none focus:text-blue-500"
          onClick={() => setSelectedMonthAtom((prev) => addMonths(prev, 1))}
        >
          <AiOutlineCaretRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
});
