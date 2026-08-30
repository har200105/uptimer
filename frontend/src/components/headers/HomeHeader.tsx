import { MonitorContext } from "@/context/MonitorContext";
import { IUser } from "@/interfaces/user.interface";
import { apolloPersistor, apolloClient } from "@/queries/apolloClient";
import { LOGOUT_USER, CHECK_CURRENT_USER } from "@/queries/auth";
import { useMutation } from "@apollo/client";
import clsx from "clsx";
import Link from "next/link";
import { FC, ReactElement, useContext, useEffect, useState } from "react";
import { FaAlignJustify, FaTimes, FaUserAlt } from "react-icons/fa";
import Sidebar from "../sidebar/Sidebar";
import { usePathname } from "next/navigation";

const HomeHeader: FC = (): ReactElement => {
  const { dispatch } = useContext(MonitorContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const pathname = usePathname();
  const [logout, { client }] = useMutation(LOGOUT_USER);
  const userData = apolloClient.readQuery({
    query: CHECK_CURRENT_USER,
  });
  const statusPage = pathname.includes('status');
  const uptimePage = pathname.includes('uptime');
  const sslPage = pathname.includes('ssl');
  const contactPage = pathname.includes('contact');

  useEffect(() => {
    setUser(userData?.checkCurrentUser?.user);
  }, [userData]);

  const renderSkeleton = (): JSX.Element => {
    return (
      <>
        <li className="h-4 w-16 animate-pulse rounded bg-gray-100"></li>
        <li className="h-4 w-16 animate-pulse rounded bg-gray-100"></li>
      </>
    );
  };

  const handleLogout = async (): Promise<void> => {
    dispatch({
      type: "dataUpdate",
      payload: {
        user: null,
        notifications: [],
      },
    });
    await Promise.all([
      client.clearStore(),
      logout(),
      apolloPersistor?.purge(),
    ]);
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur px-5 py-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold text-gray-900">
            {statusPage && 'Uptime Tests'}
            {uptimePage && 'Test Details'}
            {sslPage && 'SSL Tests'}
            {contactPage && 'Contact Groups'}
          </span>
        </div>
        <div
          className="cursor-pointer lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? (
            <FaAlignJustify className="text-xl text-gray-500" />
          ) : (
            <FaTimes className="text-xl text-gray-500" />
          )}
        </div>
        <div className="hidden lg:flex items-center gap-3 text-sm">
          {!user ? (
            <ul className="flex items-center gap-4">{renderSkeleton()}</ul>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-gray-500">
                <FaUserAlt className="text-xs" />
                {user?.username}
              </div>
              <Link
                href="/"
                onClick={handleLogout}
                className="rounded-full px-3.5 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
      <div
        className={clsx(
          "mt-3 rounded-xl bg-white shadow-lg shadow-gray-900/5 ring-1 ring-gray-900/5 p-3 lg:hidden",
          { hidden: !menuOpen }
        )}
      >
        {!user ? (
          <ul className="flex flex-col gap-2">{renderSkeleton()}</ul>
        ) : (
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-500">
              <FaUserAlt className="text-xs" />
              {user?.username}
            </div>
            <Sidebar type="header" />
            <Link
              href="/"
              onClick={handleLogout}
              className="rounded-full px-3.5 py-1.5 text-center text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
