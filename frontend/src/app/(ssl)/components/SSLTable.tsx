import { FC, ReactElement } from 'react';
import { FaArrowDown, FaArrowUp, FaExclamationTriangle, FaPause, FaPencilAlt, FaPlay, FaTrashAlt } from 'react-icons/fa';
import { IPagination } from '@/interfaces/monitor.interface';
import { ISSLInfo, ISSLMonitorDocument, sslDefaultInfoData } from '@/interfaces/ssl.interface';
import Button from '@/components/Button';
import clsx from 'clsx';
import { useSSLTable } from '../hooks/useSSLTable';
import SSLInfoModal from './SSLInfoModal';

interface SSLTableProps {
  monitors: ISSLMonitorDocument[];
  limit: IPagination;
}

const SSLTable: FC<SSLTableProps> = ({ monitors, limit }): ReactElement => {
  const { showModal, selectMonitor, setShowModal, setSelectedMonitor, formatSSLDate, toggleUserMonitor, editMonitor, deleteUserMonitor } =
    useSSLTable();

  const renderButtons = (monitor: ISSLMonitorDocument): JSX.Element => {
    return (
      <div className="inline-flex items-center gap-1" role="group">
        <Button
          onClick={() => editMonitor(monitor)}
          icon={<FaPencilAlt className="text-xs" />}
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        />
        <Button
          onClick={() => toggleUserMonitor(monitor)}
          icon={monitor.active ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        />
        <Button
          onClick={() => deleteUserMonitor(monitor)}
          icon={<FaTrashAlt className="text-xs" />}
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600"
        />
      </div>
    );
  };

  return (
    <>
      {showModal && <SSLInfoModal monitor={selectMonitor!} onClose={() => setShowModal(false)} />}
      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-600 rtl:text-right">
          <thead className="text-xs font-medium uppercase tracking-wide text-gray-400">
            <tr>
              <th scope="col" className="px-5 py-4">
                Status
              </th>
              <th scope="col" className="px-5 py-4">
                Name
              </th>
              <th scope="col" className="px-5 py-4">
                Domain
              </th>
              <th scope="col" className="px-5 py-4">
                Issuer
              </th>
              <th scope="col" className="px-5 py-4">
                Valid From
              </th>
              <th scope="col" className="px-5 py-4">
                Valid To
              </th>
              <th scope="col" className="px-5 py-4">
                Remaining
              </th>
              <th scope="col" className="px-5 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {monitors.slice(limit.start, limit.end).map((monitor: ISSLMonitorDocument) => {
              const monitorInfo: ISSLInfo = monitor.info ? JSON.parse(monitor.info) : sslDefaultInfoData;
              return (
                <tr key={monitor.id} className="bg-white hover:bg-gray-50">
                  <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <button
                      type="button"
                      className={clsx('flex h-7 w-7 items-center justify-center rounded-full text-xs', {
                        'bg-green-50 text-green-600': monitorInfo.type === 'success',
                        'bg-red-50 text-red-600': monitorInfo.type === 'danger' || monitorInfo.type === '--' || monitorInfo.type === 'expired',
                        'bg-yellow-50 text-yellow-600': monitorInfo.type === 'expiring soon'
                      })}
                    >
                      {monitorInfo.type === 'success' && <FaArrowUp />}
                      {(monitorInfo.type === 'danger' || monitorInfo.type === '--' || monitorInfo.type === 'expired') && <FaArrowDown />}
                      {monitorInfo.type === 'expiring soon' && <FaExclamationTriangle />}
                    </button>
                  </th>
                  <td className="max-w-[250px] truncate whitespace-nowrap px-5 py-4 text-ellipsis">{monitor.name}</td>
                  <td
                    className="max-w-[250px] cursor-pointer truncate whitespace-nowrap px-5 py-4 text-ellipsis text-brand hover:underline"
                    onClick={() => {
                      setSelectedMonitor(monitor);
                      setShowModal(true);
                    }}
                  >
                    {monitor.url}
                  </td>
                  <td className="max-w-[250px] truncate whitespace-nowrap px-5 py-4 text-ellipsis">{monitorInfo.issuer.common_name}</td>
                  <td className="px-5 py-4">{formatSSLDate(monitorInfo.info.validFrom!)}</td>
                  <td className="px-5 py-4">{formatSSLDate(monitorInfo.info.validTo!)}</td>
                  <td className="px-5 py-4">
                    {monitorInfo.info.daysLeft} {monitorInfo.info.daysLeft !== '--' ? 'days' : ''}
                  </td>
                  <td className="px-5 py-4">{renderButtons(monitor)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SSLTable;
