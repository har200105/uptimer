"use client";

import Assertions from "@/app/(uptime)/components/Assertions";
import FormButtons from "@/app/(uptime)/components/FormButtons";
import MonitorBaseInfo from "@/app/(uptime)/components/MonitorBaseInfo";
import { useMongoDBEdit } from "@/app/(uptime)/hooks/useMongoDBMonitor";
import PageLoader from "@/components/PageLoader";
import { EditMonitorProps } from "@/interfaces/monitor.interface";
import { ChangeEvent, FC, ReactElement } from "react";

const EditMongoDBMonitor: FC<EditMonitorProps> = ({ params }): ReactElement => {
  const {
    loading,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  } = useMongoDBEdit(params.monitorId);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <form action={onHandleSubmit} className="mx-auto max-w-3xl p-6">
          <h1 className="mb-5 text-xl font-semibold text-gray-900">
            Edit MongoDB Monitor
          </h1>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <MonitorBaseInfo
              buttonsText={['MONGODB']}
              urlLabel="MongoDB Connection String"
              type="mongodb"
              urlPlaceholder="mongodb://username:password@host:post/database"
              monitorInfo={monitorInfo}
              validationErrors={validationErrors}
              notifications={notifications}
              setMonitorInfo={setMonitorInfo}
            />
            <Assertions>
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
                    const value: string = (event.target as HTMLInputElement).value;
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

export default EditMongoDBMonitor;
