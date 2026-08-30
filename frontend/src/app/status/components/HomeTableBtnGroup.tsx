import Button from "@/components/Button";
import { IMonitorDocument } from "@/interfaces/monitor.interface";
import React, { FC, ReactElement } from "react";
import { FaPause, FaPlay, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useHomeTableBtnGroup } from "../hooks/useHomeTableBtnGroup";

interface HomeTableBtnGroupProps {
  monitor: IMonitorDocument;
}

const HomeTableBtnGroup: FC<HomeTableBtnGroupProps> = ({
  monitor,
}): ReactElement => {
  const {
    toggleUserMonitor,
    editMonitor,
    deleteUserMonitor
  } = useHomeTableBtnGroup({ monitor });

  return (
    <div className="inline-flex gap-1" role="group">
      <Button
        onClick={toggleUserMonitor}
        icon={monitor.active ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900"
      />
      <Button
        onClick={editMonitor}
        icon={<FaPencilAlt className="text-xs" />}
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900"
      />
      <Button
        onClick={deleteUserMonitor}
        icon={<FaTrashAlt className="text-xs" />}
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900"
      />
    </div>
  );
};

export default HomeTableBtnGroup;
