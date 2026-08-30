import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { ContactFormProps, ISlackChannel } from "@/interfaces/notification.interface";
import { isEmail } from "@/utils/utils";
import { filter, toLower } from "lodash";
import Link from "next/link";
import { ChangeEvent, FC, ReactElement, KeyboardEvent } from "react";
import { FaSlack, FaTrashAlt } from "react-icons/fa";

const ContactForm: FC<ContactFormProps> = ({
  label,
  notificationGroup,
  emails,
  itemInput,
  slackChannels,
  slackInput,
  setNotificationGroup,
  setEmails,
  setItemInput,
  setSlackInput,
  addSlackChannel,
  removeSlackChannel,
  onFormHandler,
}): ReactElement => {
  return (
    <form action={onFormHandler} className="mx-auto max-w-2xl p-6">
      <div className="mb-5 text-xl font-semibold text-gray-900">
        Contact Group Details
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <label
            htmlFor="notificationGroup"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Group Name <sup className="text-red-400">*</sup>
          </label>
          <TextInput
            type="text"
            id="notificationGroup"
            className="h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Enter a name for this group"
            value={notificationGroup.groupName}
            onChange={(event: ChangeEvent) => {
              const value: string = (event.target as HTMLInputElement).value;
              setNotificationGroup({...notificationGroup, groupName: value });
            }}
          />
        </div>
        <div>
          <label
            htmlFor="emails"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address(es) <sup className="text-red-400">*</sup>
          </label>
          <div className="mb-2.5 flex flex-wrap gap-2">
            {emails.map((email: string, index: number) => (
              <div key={index} className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {email}
                <span
                  className="cursor-pointer font-bold text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    const items: string[] = filter(emails, (item: string) => item !== email);
                    setEmails(items);
                  }}
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <TextInput
            type="text"
            id="emails"
            className="h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Enter email addresses"
            value={itemInput}
            onChange={(event: ChangeEvent) => {
              const value: string = (event.target as HTMLInputElement).value;
              setItemInput(toLower(value));
            }}
            onKeyDown={(event: KeyboardEvent) => {
              const { key } = event;
              if (key === 'Enter' && !emails.includes(itemInput) && isEmail(itemInput)) {
                setEmails((email: string[]) => [...email, itemInput]);
                setItemInput('');
                /**
                 * This is added so the form does not automatically submit when
                 * the use hits enter on the keyboard
                 */
                event.preventDefault();
              }
            }}
          />
          <label htmlFor="emails" className="mt-2 block text-xs text-gray-400">
            Hit Enter on your keyboard to add.
          </label>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Slack Channels (optional)
        </label>
        {slackChannels.length > 0 && (
          <div className="mb-3 flex flex-col gap-2">
            {slackChannels.map((channel: ISlackChannel, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 rounded-xl bg-gray-50 px-3.5 py-2.5 text-xs text-gray-700"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <FaSlack className="shrink-0 text-gray-400" />
                  <span className="font-medium text-gray-900">{channel.name}</span>
                  <span className="truncate text-gray-400" title={channel.webhookUrl}>{channel.webhookUrl}</span>
                  {channel.memberIds && (
                    <span className="shrink-0 text-gray-400">· tags: {channel.memberIds}</span>
                  )}
                </div>
                <FaTrashAlt
                  className="shrink-0 cursor-pointer text-gray-400 hover:text-red-500"
                  onClick={() => removeSlackChannel(index)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <TextInput
            type="text"
            className="h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Channel name"
            value={slackInput.name}
            onChange={(event: ChangeEvent) => {
              const value: string = (event.target as HTMLInputElement).value;
              setSlackInput({ ...slackInput, name: value });
            }}
          />
          <TextInput
            type="text"
            className="h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="https://hooks.slack.com/services/..."
            value={slackInput.webhookUrl}
            onChange={(event: ChangeEvent) => {
              const value: string = (event.target as HTMLInputElement).value;
              setSlackInput({ ...slackInput, webhookUrl: value });
            }}
          />
          <TextInput
            type="text"
            className="h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Member IDs to tag (optional, comma separated)"
            value={slackInput.memberIds}
            onChange={(event: ChangeEvent) => {
              const value: string = (event.target as HTMLInputElement).value;
              setSlackInput({ ...slackInput, memberIds: value });
            }}
          />
        </div>
        <Button
          type="button"
          label="Add Channel"
          className="mt-3 rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
          onClick={addSlackChannel}
        />
        <label className="mt-2 block text-xs text-gray-400">
          Create an Incoming Webhook in your Slack workspace and paste its URL here. Member IDs (from a Slack profile&apos;s &quot;Copy member ID&quot;) get @-mentioned in the alert.
        </label>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Link
          href="/contact"
          className="rounded-full px-4 py-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          label={label}
          className="rounded-xl bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
        />
      </div>
    </form>
  );
};

export default ContactForm;
