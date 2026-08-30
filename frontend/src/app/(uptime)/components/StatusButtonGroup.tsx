import Button from '@/components/Button';
import { IStatusPageButtonGroup } from '@/interfaces/monitor.interface';
import { FC, ReactElement } from 'react';
import { FaPause, FaPencilAlt, FaPlay, FaTrashAlt } from 'react-icons/fa';

const StatusButtonGroup: FC<IStatusPageButtonGroup> = ({ monitor, toggleUserMonitor, editMonitor, deleteUserMonitor }): ReactElement => {
  return (
    <>
      {monitor && (
        <div className="inline-flex items-center gap-2" role="group">
          <Button
            type="button"
            label="Edit"
            onClick={editMonitor}
            icon={<FaPencilAlt className="text-xs" />}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-700"
          />
          <Button
            type="button"
            onClick={toggleUserMonitor}
            label={monitor.active ? 'Pause' : 'Resume'}
            icon={monitor.active ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          />
          <Button
            type="button"
            onClick={deleteUserMonitor}
            label="Delete"
            icon={<FaTrashAlt className="text-xs" />}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600"
          />
        </div>
      )}
    </>
  );
};

export default StatusButtonGroup;
