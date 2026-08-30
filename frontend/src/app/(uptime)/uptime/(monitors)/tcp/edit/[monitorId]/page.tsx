"use client";

import Assertions from "@/app/(uptime)/components/Assertions";
import FormButtons from "@/app/(uptime)/components/FormButtons";
import MonitorBaseInfo from "@/app/(uptime)/components/MonitorBaseInfo";
import MonitorItem from "@/app/(uptime)/components/MonitorItem";
import { useTCPEdit } from "@/app/(uptime)/hooks/useTCPMonitor";
import PageLoader from "@/components/PageLoader";
import { EditMonitorProps } from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { ChangeEvent, FC, ReactElement } from "react";

const EditTCPMonitor: FC<EditMonitorProps> = ({ params }): ReactElement => {
  const {
    loading,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  } = useTCPEdit(params.monitorId);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <form
          action={onHandleSubmit}
          className="mx-auto max-w-3xl p-6"
        >
          <h1 className="mb-5 text-xl font-semibold text-gray-900">
            Edit TCP Monitor
          </h1>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <MonitorBaseInfo
              buttonsText={["TCP"]}
              urlLabel="Hostname"
              type="tcp"
              urlPlaceholder="Enter hostname"
              monitorInfo={monitorInfo}
              validationErrors={validationErrors}
              notifications={notifications}
              setMonitorInfo={setMonitorInfo}
            />
            <MonitorItem
              id="timeout"
              type="text"
              requiredIcon={true}
              topClass="mt-5"
              labelStart="Timeout (Default is 3 seconds)"
              className={clsx(
                "h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none",
                {
                  "ring-2 ring-red-300": validationErrors!.timeout,
                }
              )}
              inputValue={monitorInfo.timeout}
              placeholder="Request timeout"
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({
                  ...monitorInfo,
                  timeout: !isNaN(parseInt(value)) ? parseInt(value) : "",
                });
              }}
            />
            <Assertions>
              <MonitorItem
                id="responseTime"
                type="number"
                topClass="mb-3"
                labelStart="When response time is less than (Default is 2000ms)"
                inputValue={monitorInfo.responseTime}
                placeholder="Default is 2000ms"
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement)
                    .value;
                  setMonitorInfo({
                    ...monitorInfo,
                    responseTime: !isNaN(parseInt(value))
                      ? parseInt(value)
                      : "",
                  });
                }}
              />
              <div>
                <div className="mb-1.5 text-sm font-medium text-gray-700">
                  And connection is (Default is established)
                </div>
                <select
                  id="connection"
                  name="connection"
                  className="h-11 w-full cursor-pointer rounded-xl bg-white px-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none"
                  value={monitorInfo.connection}
                  onChange={(event: ChangeEvent) => {
                    const value: string = (event.target as HTMLInputElement)
                      .value;
                    setMonitorInfo({ ...monitorInfo, connection: value });
                  }}
                >
                  <option value="none">Select</option>
                  <option value="established">Established</option>
                  <option value="refused">Refused</option>
                </select>
              </div>
            </Assertions>
          </div>
          <FormButtons href="/status" buttonLabel="Update Monitor" />
        </form>
      )}
    </>
  );
};

export default EditTCPMonitor;
