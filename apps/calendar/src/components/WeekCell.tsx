import { memo } from "react";

import { Cell } from "./CalendarEntries";

export type WeekCellProps = { cell: Cell };

export const WeekCell: React.FC<WeekCellProps> = memo(({ cell }) => {
  const columnHeaderClassnames =
    "flex justify-center font-medium items-center text-gray-300 text-center bg-gray-900";

  return (
    <div key={cell.index} className={columnHeaderClassnames}>
      W {cell.index}
    </div>
  );
});
