import { Dispatch, SetStateAction } from "react";

export interface ISlackChannel {
  name: string;
  webhookUrl: string;
  memberIds?: string;
}

export interface INotification {
  __typename?: string;
  id?: number | string;
  userId: number;
  groupName: string;
  emails: string;
  slack?: string;
}

export interface INotificationGroup {
  userId?: number;
  groupName: string;
  emails: string | string[];
  slack?: string;
}

export interface ISlackChannelInput {
  name: string;
  webhookUrl: string;
  memberIds: string;
}

export interface ContactFormProps {
  label: string;
  notificationGroup: INotificationGroup;
  emails: string[];
  itemInput: string;
  slackChannels: ISlackChannel[];
  slackInput: ISlackChannelInput;
  setNotificationGroup: Dispatch<SetStateAction<INotificationGroup>>;
  setEmails: Dispatch<SetStateAction<string[]>>;
  setItemInput: Dispatch<SetStateAction<string>>;
  setSlackInput: Dispatch<SetStateAction<ISlackChannelInput>>;
  addSlackChannel: () => void;
  removeSlackChannel: (index: number) => void;
  onFormHandler: () => void;
}

export interface IUseViewContact {
  notifications: INotification[];
  deleteGroup: (notificationId: number) => Promise<void>
}

export interface IUseContact {
  isPending: boolean;
  notificationGroup: INotificationGroup;
  emails: string[];
  itemInput: string;
  slackChannels: ISlackChannel[];
  slackInput: ISlackChannelInput;
  setNotificationGroup: Dispatch<SetStateAction<INotificationGroup>>;
  setEmails: Dispatch<SetStateAction<string[]>>;
  setItemInput: Dispatch<SetStateAction<string>>;
  setSlackInput: Dispatch<SetStateAction<ISlackChannelInput>>;
  addSlackChannel: () => void;
  removeSlackChannel: (index: number) => void;
  onHandleSubmit: () => void;
}
