import { FC, ReactElement } from 'react';
import clsx from 'clsx';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import dayjs from 'dayjs';
import { IHeartbeat, IStatusPage } from '@/interfaces/monitor.interface';

const StatusTable: FC<IStatusPage> = ({ limit, heartBeats }): ReactElement => {
  const dateFormat = (timestamp: string): string => {
    return dayjs(new Date(JSON.parse(timestamp))).format('YYYY-MM-DD HH:mm:ss A');
  };

  return (
    <div className="relative overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600 rtl:text-right">
        <thead className="text-xs font-medium uppercase tracking-wide text-gray-400">
          <tr>
            <th scope="col" className="px-5 py-3">
              Status
            </th>
            <th scope="col" className="px-5 py-3">
              Tested
            </th>
            <th scope="col" className="px-5 py-3">
              Code
            </th>
            <th scope="col" className="px-5 py-3">
              Time
            </th>
            <th scope="col" className="px-5 py-3">
              Message
            </th>
          </tr>
        </thead>
        {heartBeats.length ? (
          <tbody className="divide-y divide-gray-100">
            {heartBeats.slice(limit.start, limit.end).map((heartbeat: IHeartbeat) => (
              <tr key={heartbeat.id} className="hover:bg-gray-50">
                <td scope="row" className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                  <span
                    className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', {
                      'bg-red-50 text-red-600': heartbeat.status === 1,
                      'bg-green-50 text-green-600': heartbeat.status === 0
                    })}
                  >
                    {heartbeat.status === 1 ? <FaArrowDown className="text-xs" /> : <FaArrowUp className="text-xs" />}
                  </span>
                </td>
                <td className="px-5 py-4">{dateFormat(`${heartbeat.timestamp}`)}</td>
                <td className="px-5 py-4">{heartbeat.code}</td>
                <td className="px-5 py-4">{heartbeat.responseTime / 1000}s</td>
                <td className="px-5 py-4">{heartbeat.message}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
      {!heartBeats.length && <div className="p-6 text-center text-sm text-gray-400">No heartbeat data available.</div>}
    </div>
  );
};

export default StatusTable;
