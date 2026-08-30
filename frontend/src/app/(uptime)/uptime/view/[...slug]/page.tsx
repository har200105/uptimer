'use client';

import StatusButtonGroup from '@/app/(uptime)/components/StatusButtonGroup';
import StatusTable from '@/app/(uptime)/components/StatusTable';
import { useUptimeView } from '@/app/(uptime)/hooks/useUptimeView';
import Button from '@/components/Button';
import PageLoader from '@/components/PageLoader';
import Paginate from '@/components/Paginate';
import ResponseChart from '@/components/ResponseChart';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';

type ViewProp = {
  params: {
    slug: string[];
  };
};

const View: FC<ViewProp> = ({ params }): ReactElement => {
  const {
    limit,
    duration,
    monitor,
    heartbeatsData,
    statusResponse,
    updateLimit,
    toggleUserMonitor,
    editMonitor,
    deleteUserMonitor,
    setQueryDuration
  } = useUptimeView(params);

  return (
    <>
      {monitor ? (
        <div className="mx-auto max-w-5xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-900">{monitor.name}</span>
              <a className="text-xs text-brand hover:underline" target="_blank" href={monitor.url}>
                {monitor.url}
              </a>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div
                className={clsx('rounded-full px-3.5 py-1.5 text-sm font-medium', {
                  'bg-green-50 text-green-600': monitor.active && monitor.status === 0,
                  'bg-yellow-50 text-yellow-700': !monitor.active,
                  'bg-red-50 text-red-600': monitor.active && monitor.status === 1
                })}
              >
                Status: {monitor.active ? 'Running' : 'Paused'}
              </div>
              <StatusButtonGroup
                monitor={monitor}
                toggleUserMonitor={toggleUserMonitor}
                editMonitor={editMonitor}
                deleteUserMonitor={deleteUserMonitor}
              />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Button
              type="button"
              onClick={() => setQueryDuration('24')}
              label="24 Hours"
              className={clsx(
                'rounded-full px-3.5 py-1.5 text-sm font-medium',
                {
                  'bg-gray-900 text-white': duration === '24',
                  'bg-gray-100 text-gray-600 hover:bg-gray-200': duration !== '24'
                }
              )}
            />
            <Button
              type="button"
              onClick={() => setQueryDuration('12')}
              label="12 Hours"
              className={clsx(
                'rounded-full px-3.5 py-1.5 text-sm font-medium',
                {
                  'bg-gray-900 text-white': duration === '12',
                  'bg-gray-100 text-gray-600 hover:bg-gray-200': duration !== '12'
                }
              )}
            />
            <Button
              label="6 Hours"
              type="button"
              onClick={() => setQueryDuration('6')}
              className={clsx(
                'rounded-full px-3.5 py-1.5 text-sm font-medium',
                {
                  'bg-gray-900 text-white': duration === '6',
                  'bg-gray-100 text-gray-600 hover:bg-gray-200': duration !== '6'
                }
              )}
            />
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-xs font-medium text-gray-400">Latest Response</span>
                <span className="text-lg font-semibold text-gray-900">{statusResponse.latestResponse}ms</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-xs font-medium text-gray-400">Avg. Response {duration}-hour</span>
                <span className="text-lg font-semibold text-gray-900">{statusResponse.averageResponse.toFixed(2)}ms</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-xs font-medium text-gray-400">Uptime {duration}-hour</span>
                <span className="text-lg font-semibold text-gray-900">{statusResponse.uptime.toFixed(2)}%</span>
              </div>
            </div>
          </div>
          {heartbeatsData.length > 0 ? (
            <div className="mt-5">
              <ResponseChart heartBeats={heartbeatsData} />
            </div>
          ) : (
            <></>
          )}
          <div className="mt-6">
            <div className="mb-3 text-lg font-semibold text-gray-900">Latest Tests</div>
            <StatusTable limit={limit} heartBeats={heartbeatsData} monitor={monitor} />
            {heartbeatsData.length > 0 ? (
              <div className="mt-3">
                <Paginate updateLimit={updateLimit} length={heartbeatsData.length} defaultLimit={limit.end} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default View;
