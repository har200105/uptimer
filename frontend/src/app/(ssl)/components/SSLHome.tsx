import { FC, ReactElement } from "react";
import { useSSLHome } from "../hooks/useSSLHome";
import PageLoader from "@/components/PageLoader";
import Link from "next/link";
import SSLTable from "./SSLTable";
import Paginate from "@/components/Paginate";
import { FaCheckCircle } from "react-icons/fa";
import SSLButtonGroup from "./SSLButtonGroup";

const SSLHome: FC = (): ReactElement => {
  const { loading, monitors, limit, updateLimit } = useSSLHome();

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="p-5 md:p-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SSLButtonGroup sslMonitors={monitors} />
            <Link
              href="/ssl/create"
              className="rounded-xl bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
            >
              New SSL Test
            </Link>
          </div>
          {monitors.length > 0 ? (
            <>
              <div className="mb-5 overflow-hidden rounded-2xl bg-white shadow-sm">
                <SSLTable limit={limit} monitors={monitors} />
              </div>
              <Paginate
                updateLimit={updateLimit}
                length={monitors.length}
                defaultLimit={limit.end}
              />
            </>
          ) : (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
              <FaCheckCircle className="text-3xl text-green-500" />
              <p className="text-sm text-gray-500">
                You have no SSL tests.
              </p>
              <Link
                href="/ssl/create"
                className="mt-2 rounded-xl bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
              >
                New SSL Test
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SSLHome;
