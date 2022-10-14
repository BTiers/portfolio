import { memo } from "react";

const DAYS_IN_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CalendarColumnHeaders: React.FC = memo(() => {
  const columnHeaderClassnames =
    "flex justify-center font-medium text-base items-center text-gray-200 text-center h-16 w-16";

  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => {
        if (index === 0)
          return <div key={index} className={columnHeaderClassnames} />;

        return (
          <div key={index} className={columnHeaderClassnames}>
            {DAYS_IN_WEEK[index - 1]}
          </div>
        );
      })}
    </>
  );
});
