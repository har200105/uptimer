import {
  IMonitorDocument,
  IMonitorState,
  IPagination,
} from "@/interfaces/monitor.interface";
import { Dispatch, FormEvent, SetStateAction } from "react";
import HomeButtonGroup from "./HomeButtonGroup";
import Button from "@/components/Button";
import clsx from "clsx";
import { FaBorderAll, FaCheckCircle, FaPause, FaPlay } from "react-icons/fa";
import TextInput from "@/components/TextInput";
import HomeTable from "./HomeTable";
import HomeGrid from "./HomeGrid";
import { setLocalStorageItem } from "@/utils/utils";
import { filter, some, toLower } from "lodash";
import Paginate from "@/components/Paginate";

export const renderCreateButton = (monitorState: IMonitorState, setMonitorState: Dispatch<SetStateAction<IMonitorState>>): JSX.Element => {
  return (
    <div className="h-[50%] flex flex-col items-center justify-center">
      <FaCheckCircle className="text-4xl text-gray-300" />
      <p className="mt-3 text-sm text-gray-500">You have no uptime tests.</p>
      <Button
        onClick={() => setMonitorState({...monitorState, showModal: true})}
        className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        label="New Uptime Test"
      />
    </div>
  );
};

export const renderButtons = (
  monitors: IMonitorDocument[],
  monitorState: IMonitorState,
  setMonitorState: Dispatch<SetStateAction<IMonitorState>>
): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
      <HomeButtonGroup monitors={monitors} />
      <Button
        onClick={() => setMonitorState({ ...monitorState, showModal: true })}
        label="New Uptime Test"
        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      />
    </div>
  );
};

export const renderRefreshButtons = (
  view: string,
  isRefreshed: boolean,
  monitorsRef: IMonitorDocument[],
  monitors: IMonitorDocument[],
  setView: Dispatch<SetStateAction<string>>,
  setMonitors: Dispatch<SetStateAction<IMonitorDocument[]>>,
  refreshMonitors: () => void,
  enableAutoRefresh: () => void,
): JSX.Element => {
  const hasActiveMonitors: boolean = some(monitors, (monitor: IMonitorDocument) => monitor.active);
  let refreshed: boolean = isRefreshed;
  if (isRefreshed && !hasActiveMonitors) {
    refreshed = false;
    setLocalStorageItem('refresh', JSON.stringify(false));
  }
  return (
    <div className="flex flex-col items-start gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
      <Button
        onClick={refreshMonitors}
        label="Refresh"
        className={clsx(
          "rounded-xl px-4 py-2 text-sm font-medium",
          {
            "cursor-not-allowed pointer-events-none bg-gray-100 text-gray-400": refreshed,
            "cursor-pointer bg-gray-900 text-white hover:bg-gray-700": !refreshed,
          }
        )}
      />
      <div className="flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-end">
        <div className="flex min-w-[9rem] cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-3.5 py-2 text-gray-700 hover:bg-gray-200"
          onClick={() => {
            const item = view === 'box' ? 'list' : 'box';
            setLocalStorageItem('view', JSON.stringify(item));
            setView(item);
          }}
        >
          <FaBorderAll className="text-xs text-gray-400" />
          <Button
            label={view === "box" ? "List View" : "Box View"}
            className="text-sm font-medium"
          />
        </div>
        <div onClick={enableAutoRefresh} className="flex min-w-[9rem] cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-3.5 py-2 text-gray-700 hover:bg-gray-200">
          {!refreshed ? <FaPlay className="text-xs text-gray-400" /> : <FaPause className="text-xs text-gray-400" />}
          <Button
            label={
              !refreshed ? "Enable Auto Refresh" : "Disable Auto Refresh"
            }
            className="text-sm font-medium"
          />
        </div>
        <div className="w-full lg:w-[260px]"
          onChange={(event: FormEvent) => {
            const value: string = (event.target as HTMLInputElement).value;
            const results: IMonitorDocument[] = filter(monitors, (monitor: IMonitorDocument) => {
              return toLower(monitor.name).includes(toLower(value)) || toLower(monitor.type).includes(toLower(value))
            });
            setMonitors(!value || !results.length ? monitorsRef : results);
          }}
        >
          <TextInput
            type="text"
            name="search"
            className="h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Search by name"
          />
        </div>
      </div>
    </div>
  );
};

export const renderTableAndPagination = (
  view: string,
  limit: IPagination,
  autoRefreshLoading: boolean,
  monitors: IMonitorDocument[],
  updateLimit: (newLimit: IPagination) => void
): JSX.Element => {
  return (
    <>
      <div className="my-5">
        {view === 'box' ? (
          <HomeTable limit={limit} monitors={monitors} autoRefreshLoading={autoRefreshLoading} />
        ) : (
          <HomeGrid limit={limit} monitors={monitors} autoRefreshLoading={autoRefreshLoading} />
        )}
      </div>
      <div className="my-5">
        {monitors.length > 0 ? <Paginate updateLimit={updateLimit} length={monitors.length} defaultLimit={limit.end} /> : <></>}
      </div>
    </>
  );
}
