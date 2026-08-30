import Button from "@/components/Button";
import {
  HomeTableProps,
  IMonitorDocument,
} from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { upperCase } from "lodash";
import { FC, ReactElement, useCallback, useContext } from "react";
import {
  FaCircleNotch,
  FaArrowDown,
  FaArrowUp,
  FaPlay,
  FaPause,
  FaPencilAlt,
  FaTrashAlt,
} from "react-icons/fa";
import HomeTableBtnGroup from "./HomeTableBtnGroup";
import HealthBar from "@/components/HealthBar";
import { convertFrequency, timeFromNow } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { MonitorContext } from "@/context/MonitorContext";

const DEFAULT_DURATION = 24;

const HomeTable: FC<HomeTableProps> = ({
  monitors,
  limit,
  autoRefreshLoading,
}): ReactElement => {
  const { dispatch } = useContext(MonitorContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToStatusPage = (monitor: IMonitorDocument): void => {
    // 24 is the default duration
    const params = new URLSearchParams(searchParams.toString());
    params.set('active', JSON.stringify(monitor.active));
    router.push(`/uptime/view/${monitor.type}/${monitor.id}/${DEFAULT_DURATION}?${params}`);
    dispatch({
      type: 'monitor',
      payload: monitor
    });
  };

  return (
    <div className="relative overflow-x-auto rounded-2xl bg-white shadow-sm">
      {autoRefreshLoading ? (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white/80">
          <FaCircleNotch className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : (
        <></>
      )}
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead className="text-xs font-medium uppercase tracking-wide text-gray-400">
          <tr>
            <th scope="col" className="px-5 py-4">
              Status
            </th>
            <th scope="col" className="px-5 py-4">
              Type
            </th>
            <th scope="col" className="px-5 py-4">
              Name
            </th>
            <th scope="col" className="px-5 py-4 w-[15%]">
              Uptime
            </th>
            <th scope="col" className="px-5 py-4 w-[15%]">
              Frequency
            </th>
            <th scope="col" className="px-5 py-4">
              Last Modified
            </th>
            <th scope="col" className="px-5 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {monitors
            .slice(limit.start, limit.end)
            .map((monitor: IMonitorDocument) => (
              <tr
                key={monitor.id}
                className="hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-5 py-4 font-medium text-gray-900"
                >
                  <button
                    type="button"
                    className={clsx(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs",
                      {
                        "bg-gray-100 text-gray-500": !monitor.active,
                        "bg-green-50 text-green-600": monitor.active && monitor.status === 0,
                        "bg-red-50 text-red-600": monitor.active && monitor.status === 1,
                      }
                    )}
                  >
                    {monitor.active ? (
                      <>
                        {monitor.status === 1 ? <FaArrowDown /> : <FaArrowUp />}
                      </>
                    ) : (
                      <FaPlay />
                    )}
                  </button>
                </th>
                <td className="px-5 py-4">{upperCase(monitor.type)}</td>
                <td
                  onClick={() => navigateToStatusPage(monitor)}
                  className="max-w-[270px] cursor-pointer truncate whitespace-nowrap px-5 py-4 font-medium text-brand"
                >
                  {monitor.name}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8">{monitor.uptime}%</span>
                    <HealthBar size="small" heartBeats={monitor.heartbeats!} />
                  </div>
                </td>
                <td className="px-5 py-4">{convertFrequency(monitor.frequency)}</td>
                <td className="max-w-[270px] truncate whitespace-nowrap px-5 py-4">
                  {monitor.lastChanged ? <>{timeFromNow(`${monitor.lastChanged}`)}</> : "None"}
                </td>
                <td className="px-5 py-4">
                  <HomeTableBtnGroup monitor={monitor} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
