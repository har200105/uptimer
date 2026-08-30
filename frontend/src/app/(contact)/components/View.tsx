import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { useViewContact } from '../hooks/useViewContact';
import { INotification } from '@/interfaces/notification.interface';
import Button from '@/components/Button';
import { FaPencilAlt, FaRegEnvelopeOpen, FaSlack, FaTrashAlt } from 'react-icons/fa';

const ContactGroupView: FC = (): ReactElement => {
  const { notifications, deleteGroup } = useViewContact();

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-end">
        <Link
          href="/contact/create"
          className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          New Notification Group
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className="text-xs font-medium uppercase tracking-wide text-gray-400">
              <tr>
                <th scope="col" className="px-5 py-4">
                  Group Name
                </th>
                <th scope="col" className="px-5 py-4">
                  Integrations
                </th>
                <th scope="col" className="px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notifications.map((notification: INotification) => {
                const emailsGroup = JSON.parse(notification.emails);
                const slackChannels = notification.slack ? JSON.parse(notification.slack) : [];

                return (
                  <tr key={notification.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium cursor-pointer text-brand">{notification.groupName}</td>
                    <td className="px-5 py-4 font-medium cursor-pointer">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          label={`${emailsGroup.length}`}
                          icon={<FaRegEnvelopeOpen className="text-xs text-gray-400" />}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                        />
                        {slackChannels.length > 0 && (
                          <Button
                            label={`${slackChannels.length}`}
                            icon={<FaSlack className="text-xs text-gray-400" />}
                            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="inline-flex gap-1" role="group">
                        <Link
                          href={`/contact/edit/${notification.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <FaPencilAlt className="text-xs" />
                        </Link>
                        <Button
                          onClick={() => deleteGroup(parseInt(`${notification.id}`))}
                          icon={<FaTrashAlt className="text-xs" />}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ContactGroupView;
