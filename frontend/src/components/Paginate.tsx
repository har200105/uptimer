import { IPagination } from "@/interfaces/monitor.interface";
import clsx from "clsx";
import React, { FC, ReactElement, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginateProps {
  updateLimit: (newLimit: IPagination) => void;
  defaultLimit: number;
  length: number;
}

const Paginate: FC<PaginateProps> = ({
  length,
  defaultLimit,
  updateLimit,
}): ReactElement => {
  const [limit] = useState<number>(defaultLimit);
  const [page, setPage] = useState<number>(1);

  function pageLimit(): number {
    return Math.floor(length / limit) + (length % limit > 0 ? 1 : 0);
  }

  function updatePage(value: number): void {
    setPage(value);
    updateLimit({
      start: limit * (value - 1),
      end: limit * value,
    });
  }

  return (
    <div className="inline-flex items-center gap-4 text-xs text-gray-500">
      <div
        onClick={() => updatePage(page - 1)}
        className={clsx(
          "flex items-center justify-center h-7 w-7 rounded-full",
          {
            "opacity-30 pointer-events-none": page === 1,
            "cursor-pointer hover:bg-gray-100": page > 1,
          }
        )}
      >
        <FaAngleLeft className="text-xs" />
      </div>
      <div className="flex gap-1 items-center">
        <span>Page</span>
        <span className="font-medium text-gray-800">
          {page} of {pageLimit()}
        </span>
      </div>
      <div
        onClick={() => updatePage(page + 1)}
        className={clsx(
          "flex items-center justify-center h-7 w-7 rounded-full",
          {
            "opacity-30 pointer-events-none": !(page < pageLimit()),
            "cursor-pointer hover:bg-gray-100": page < pageLimit(),
          }
        )}
      >
        <FaAngleRight className="text-xs" />
      </div>
    </div>
  );
};

export default Paginate;
