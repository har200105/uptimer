import Button from "@/components/Button";
import {
  HomeTableProps,
  IMonitorDocument,
} from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { FC, ReactElement, useContext } from "react";
import {
  FaArrowUp,
  FaPlay,
  FaArrowDown,
  FaCircleNotch,
} from "react-icons/fa";
import HomeTableBtnGroup from "./HomeTableBtnGroup";
import ResponseChart from "@/components/ResponseChart";
import { MonitorContext } from "@/context/MonitorContext";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_DURATION = 24;

const HomeGrid: FC<HomeTableProps> = ({
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

  const monitorIcon = (monitor: IMonitorDocument): JSX.Element => {
    if (monitor.active && monitor.status === 0) {
      return <FaArrowUp className="text-xs" />;
    }
    if (!monitor.active) {
      return <FaPlay className="text-xs" />;
    }
    return <FaArrowDown className="text-xs" />;
  };

  return (
    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {autoRefreshLoading ? (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white/80">
          <FaCircleNotch className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : (
        <></>
      )}
      {monitors
        .slice(limit.start, limit.end)
        .map((monitor: IMonitorDocument, index: number) => (
          <div key={index} className="h-auto rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col">
              <div
                className="cursor-pointer text-sm font-semibold text-brand"
                onClick={() => navigateToStatusPage(monitor)}
              >
                {monitor.name}
              </div>
              <div className="mt-3 w-full">
                <span className="mb-1 block text-xs font-medium text-gray-400">
                  Response Times (ms)
                </span>
                <ResponseChart heartBeats={monitor.heartbeats!} showLabel={false} />
              </div>
              <div className="mt-3">
                <Feature title="Status">
                  <Button
                    icon={monitorIcon(monitor)}
                    type="button"
                    className={clsx(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full",
                      {
                        "bg-green-50 text-green-600": monitor.active && monitor.status === 0,
                        "bg-gray-100 text-gray-500": !monitor.active,
                        "bg-red-50 text-red-600": monitor.active && monitor.status === 1,
                      }
                    )}
                  />
                </Feature>
                <Feature title="1 day uptime">
                  <span className="text-sm text-gray-700">{monitor.uptime}%</span>
                </Feature>
                <Feature title="Actions">
                  <HomeTableBtnGroup monitor={monitor} />
                </Feature>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const Feature = ({ title, children }: any): ReactElement => {
  return (
    <div className="flex items-center justify-between border-t border-gray-100 py-2.5 first:border-t-0">
      <span className="text-xs font-medium text-gray-400">{title}</span>
      {children}
    </div>
  );
};

export default HomeGrid;
