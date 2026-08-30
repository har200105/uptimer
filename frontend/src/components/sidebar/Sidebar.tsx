import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { FaLock, FaRegClock, FaTv, FaUser } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';
import { useRouter, useSearchParams } from 'next/navigation';

const Sidebar: FC<{ type: string }> = ({ type }): ReactElement => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const openUptimeModal = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('open', JSON.stringify(true));
    router.push(`/status?${params}`);
  }

  return (
    <div className="h-full w-full py-4">
      {type === 'sidebar' && (
        <div className="mb-4 px-5">
          <Link
            href="/status"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900"
          >
            <FaTv className="text-base text-brand" />
            Uptimer
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-1 px-3">
        <SidebarMenu
          menuText='Uptime'
          icon={<FaRegClock className="text-sm" />}
          submenuTexts={[
            { name: 'All Tests', url: '/status' },
            { name: 'New Uptime Test', onClick: openUptimeModal },
          ]}
        />
        <SidebarMenu
          menuText='SSL'
          icon={<FaLock className="text-sm" />}
          submenuTexts={[
            { name: 'All Tests', url: '/ssl' },
            { name: 'New SSL Test', url: '/ssl/create' },
          ]}
        />
        <SidebarMenu
          menuText='Contact Groups'
          icon={<FaUser className="text-sm" />}
          submenuTexts={[
            { name: 'All Contact Groups', url: '/contact' },
            { name: 'New Contact Group', url: '/contact/create' },
          ]}
        />
      </div>
    </div>
  )
}

export default Sidebar
