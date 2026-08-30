"use client";

import Assertions from "@/app/(uptime)/components/Assertions";
import FormButtons from "@/app/(uptime)/components/FormButtons";
import HttpMonitorBaseInfo from "@/app/(uptime)/components/HttpMonitorBaseInfo";
import MonitorItem from "@/app/(uptime)/components/MonitorItem";
import { useHttpCreate } from "@/app/(uptime)/hooks/useHttpMonitor";
import PageLoader from "@/components/PageLoader";
import UptimeGroupBtn from "@/components/UptimeGroupBtn";
import { EXCLUDED_HTTP_METHODS, HTTP_METHODS } from "@/utils/utils";
import clsx from "clsx";
import { toLower, upperCase } from "lodash";
import { ChangeEvent, FC, ReactElement } from "react";

const CreateHttpMonitor: FC = (): ReactElement => {
  const {
    loading,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  } = useHttpCreate();

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <form action={onHandleSubmit} className="mx-auto max-w-3xl p-6">
          <h1 className="mb-5 text-xl font-semibold text-gray-900">
            Add New HTTP Monitor
          </h1>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <HttpMonitorBaseInfo
              monitorInfo={monitorInfo}
              validationErrors={validationErrors}
              notifications={notifications}
              setMonitorInfo={setMonitorInfo}
            />
            <div className="mt-5">
              <UptimeGroupBtn
                buttonsText={["Running", "Paused"]}
                labelText="Creation State"
                type="string"
                selectedItem={`${monitorInfo.active ? "Running" : "Paused"}`}
                onClick={(event: string) => {
                  setMonitorInfo({ ...monitorInfo, active: event === "Running" });
                }}
              />
              <label htmlFor="active" className="mt-1.5 block text-xs text-gray-500">
                This defined whether the test will start to run right away, or
                should be paused for later activation.
              </label>
            </div>
            <div className="mt-5">
              <UptimeGroupBtn
                buttonsText={HTTP_METHODS}
                labelText="HTTP Verb"
                type="string"
                onClick={(event: string) => {
                  setMonitorInfo({ ...monitorInfo, method: toLower(event) });
                }}
              />
            </div>
            <MonitorItem
              id="headers"
              type="textarea"
              topClass="mt-5"
              labelStart="Request Headers (optional)"
              className={clsx(
                "w-full rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none",
                {
                  "ring-2 ring-red-300": validationErrors!.headers,
                }
              )}
              labelEnd="Headers to be attached to your endpoint request."
              inputValue={monitorInfo.headers}
              placeholder="Example: { 'key': value }. Key must always be in double quotes."
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, headers: value });
              }}
            />
            <MonitorItem
              id="body"
              type="textarea"
              topClass="mt-5"
              labelStart="Request Body (optional)"
              className={clsx(
                "w-full rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none",
                {
                  "pointer-events-none opacity-40": !EXCLUDED_HTTP_METHODS.includes(upperCase(monitorInfo.method)),
                  "ring-2 ring-red-300": validationErrors!.headers,
                }
              )}
              labelEnd="Headers to be attached to your endpoint request."
              inputValue={monitorInfo.body}
              placeholder="Example: { 'key': value }. Key must always be in double quotes."
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, body: value });
              }}
            />
            <div className="mt-5">
              <label htmlFor="auth" className="mb-1.5 block text-sm font-medium text-gray-700">
                Authentication (optional)
              </label>
              <select
                id="auth"
                name="auth"
                className={clsx(
                  'h-11 w-full cursor-pointer rounded-xl bg-gray-50 px-3.5 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none',
                  {
                    'ring-2 ring-red-300': validationErrors!.basicAuthUser || validationErrors!.basicAuthPass
                  }
                )}
                value={monitorInfo.httpAuthMethod}
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, httpAuthMethod: value });
                }}
              >
                <option value="none">None</option>
                <option value="basic">HTTP Basic Auth</option>
                <option value="token">Bearer Token</option>
              </select>
              {monitorInfo.httpAuthMethod && monitorInfo.httpAuthMethod !== 'none' && (
                <div className="mt-3 space-y-3 rounded-xl bg-gray-50 p-4">
                  {monitorInfo.httpAuthMethod === 'basic' && (
                    <>
                      <MonitorItem
                        id="text"
                        type="username"
                        labelStart="Username"
                        className={clsx(
                          'h-11 w-full rounded-xl bg-white px-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none',
                          {
                            'ring-2 ring-red-300': validationErrors!.basicAuthUser
                          }
                        )}
                        inputValue={monitorInfo.basicAuthUser}
                        placeholder="Username"
                        onChange={(event: ChangeEvent) => {
                          const value: string = (event.target as HTMLInputElement).value;
                          setMonitorInfo({ ...monitorInfo, basicAuthUser: value });
                        }}
                      />
                      <MonitorItem
                        id="password"
                        type="password"
                        labelStart="Password"
                        className={clsx(
                          'h-11 w-full rounded-xl bg-white px-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none',
                          {
                            'ring-2 ring-red-300': validationErrors!.basicAuthPass
                          }
                        )}
                        inputValue={monitorInfo.basicAuthPass}
                        placeholder="Password"
                        onChange={(event: ChangeEvent) => {
                          const value: string = (event.target as HTMLInputElement).value;
                          setMonitorInfo({ ...monitorInfo, basicAuthPass: value });
                        }}
                      />
                    </>
                  )}
                  {monitorInfo.httpAuthMethod === 'token' && (
                    <>
                      <MonitorItem
                        id="token"
                        type="text"
                        labelStart="Token"
                        className={clsx(
                          'h-11 w-full rounded-xl bg-white px-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none',
                          {
                            'ring-2 ring-red-300': validationErrors!.bearerToken
                          }
                        )}
                        inputValue={monitorInfo.bearerToken}
                        placeholder="Bearer token"
                        onChange={(event: ChangeEvent) => {
                          const value: string = (event.target as HTMLInputElement).value;
                          setMonitorInfo({ ...monitorInfo, bearerToken: value });
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
            <MonitorItem
              id="timeout"
              type="number"
              topClass="mt-5"
              labelStart="Request Timeout (Default is 10 seconds)"
              inputValue={monitorInfo.timeout}
              placeholder="Request timeout"
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, timeout: !isNaN(parseInt(value)) ? parseInt(value) : '' });
              }}
            />
            <MonitorItem
              id="redirects"
              type="number"
              topClass="mt-5"
              labelStart="Maximum Redirects (Default is 0)"
              labelEnd="Maximum number of redirects to follow. Set to 0 to disable redirects."
              inputValue={monitorInfo.redirects}
              placeholder="Redirects"
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, redirects: !isNaN(parseInt(value)) ? parseInt(value) : '' });
              }}
            />
            <Assertions>
              <MonitorItem
                id="responseTime"
                type="number"
                topClass="mb-3"
                labelStart="When response time is less than (Default is 2000ms)"
                inputValue={monitorInfo.responseTime}
                placeholder="Default is 2000 ms"
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, responseTime: !isNaN(parseInt(value)) ? parseInt(value) : '' });
                }}
              />
              <MonitorItem
                id="status"
                type="textarea"
                topClass="mb-3"
                labelStart="And the status code is"
                labelEnd="Enter all codes and separate by comma."
                inputValue={monitorInfo.statusCode}
                placeholder="Enter all codes and separate by comma. Default is 200."
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, statusCode: value });
                }}
              />
              <MonitorItem
                id="contentType"
                type="text"
                labelStart="And header content-type should include (optional)"
                labelEnd="Enter all content-types and separate by comma."
                inputValue={monitorInfo.contentType}
                placeholder="Example: text/html; charset=utf-8, application/json"
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, contentType: value });
                }}
              />
            </Assertions>
          </div>
          <FormButtons href="/status" buttonLabel="Create Monitor" />
        </form>
      )}
    </>
  );
};

export default CreateHttpMonitor;
