import { ReactElement, ReactNode, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Sidebar from "./sidebar/Sidebar";
import clsx from "clsx";
import HomeHeader from "./headers/HomeHeader";

const LayoutBody = ({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  return (
    <div className="h-screen relative bg-gray-50">
      <div
        className={clsx("grid h-full", {
          "grid-cols-5": toggleSidebar,
          "grid-cols-1": !toggleSidebar,
        })}
      >
        {toggleSidebar && (
          <div
            className={clsx(
              "h-full bg-white hidden lg:block",
              {
                "col-span-1": toggleSidebar,
                "col-span-0": !toggleSidebar,
              }
            )}
          >
            <Sidebar type="sidebar" />
          </div>
        )}

        <div
          className={clsx("col-span-5 lg:col-span-4 h-full overflow-y-auto", {
            "col-span-4": toggleSidebar,
            "col-span-1": !toggleSidebar,
          })}
        >
          <HomeHeader />
          {children}
        </div>
      </div>
      <div
        className="hidden absolute bottom-3 p-2 rounded-full cursor-pointer text-gray-300 hover:bg-gray-100 hover:text-gray-500 lg:flex"
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        {!toggleSidebar ? <FaAngleDoubleLeft className="text-sm" /> : <FaAngleDoubleRight className="text-sm" />}
      </div>
    </div>
  );
};

export default LayoutBody;
