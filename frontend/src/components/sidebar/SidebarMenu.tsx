import Link from "next/link";
import React, { FC, Fragment, ReactElement, ReactNode, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface SubmenuTextProps {
  name: string;
  url?: string;
  onClick?: () => void;
}

interface SidebarMenuProps {
  menuText: string;
  icon?: ReactNode;
  submenuTexts: SubmenuTextProps[];
}

const SidebarMenu: FC<SidebarMenuProps> = ({
  menuText,
  submenuTexts,
  icon,
}): ReactElement => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setToggleMenu(!toggleMenu)}
        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      >
        {icon}
        <div className="flex justify-between w-full items-center">
          <span className="text-sm font-medium">
            {menuText}
          </span>
          <span className="text-xs text-gray-400">
            {toggleMenu ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>
      </div>
      {toggleMenu && (
        <div className="flex flex-col text-sm text-gray-500 mt-0.5">
          {submenuTexts.map((submenu: SubmenuTextProps, index: number) => (
            <Fragment key={index}>
              {submenu.url ? (
                <Link
                  href={submenu.url}
                  className="rounded-lg px-2.5 py-1.5 ml-7 hover:bg-gray-100 hover:text-gray-900"
                >
                  {submenu.name}
                </Link>
              ) : (
                <div onClick={submenu.onClick} className="cursor-pointer rounded-lg px-2.5 py-1.5 ml-7 hover:bg-gray-100 hover:text-gray-900">
                  {submenu.name}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
