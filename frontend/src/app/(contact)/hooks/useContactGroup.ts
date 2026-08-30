import { MonitorContext } from '@/context/MonitorContext';
import { FetchResult, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { showErrorToast, showSuccessToast } from '@/utils/utils';
import { INotification, INotificationGroup, ISlackChannel, ISlackChannelInput, IUseContact } from '@/interfaces/notification.interface';
import { CREATE_NOTIFICATION_GROUP, UPDATE_NOTIFICATION_GROUP } from '@/queries/contactGroup';
import { CHECK_CURRENT_USER } from '@/queries/auth';
import { apolloClient } from '@/queries/apolloClient';
import { find } from 'lodash';

const EMPTY_SLACK_INPUT: ISlackChannelInput = { name: '', webhookUrl: '', memberIds: '' };

export const useContactGroupCreate = (): IUseContact => {
  const {
    state: { user },
    dispatch
  } = useContext(MonitorContext);
  const [notificationGroup, setNotificationGroup] = useState<INotificationGroup>({
    groupName: '',
    emails: []
  });
  const [itemInput, setItemInput] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [slackChannels, setSlackChannels] = useState<ISlackChannel[]>([]);
  const [slackInput, setSlackInput] = useState<ISlackChannelInput>(EMPTY_SLACK_INPUT);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [createNotificationGroup] = useMutation(CREATE_NOTIFICATION_GROUP, {
    update(cache, { data: { createNotificationGroup } }) {
      const { checkCurrentUser } = cache.readQuery({
        query: CHECK_CURRENT_USER,
      }) as any;
      const newNotificationGroup = createNotificationGroup.notifications[0];
      const notifications = [newNotificationGroup, ...checkCurrentUser.notifications];
      dispatch({
        type: 'dataUpdate',
        payload: {
          user: checkCurrentUser.user,
          notifications,
        },
      });
      cache.writeQuery({
        query: CHECK_CURRENT_USER,
        data: {
          checkCurrentUser: {
            __typename: 'CurrentUserResponse',
            user: checkCurrentUser.user,
            notifications
          },
        },
      });
    },
  });

  const addSlackChannel = (): void => {
    if (!slackInput.name || !slackInput.webhookUrl) {
      return;
    }
    setSlackChannels((channels: ISlackChannel[]) => [...channels, { ...slackInput }]);
    setSlackInput(EMPTY_SLACK_INPUT);
  };

  const removeSlackChannel = (index: number): void => {
    setSlackChannels((channels: ISlackChannel[]) => channels.filter((_, itemIndex: number) => itemIndex !== index));
  };

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        if (emails.length > 0 && notificationGroup.groupName) {
          const finalSlackChannels: ISlackChannel[] =
            slackInput.name && slackInput.webhookUrl ? [...slackChannels, { ...slackInput }] : slackChannels;
          const group = {
            ...notificationGroup,
            userId: user?.id,
            emails: JSON.stringify(emails),
            slack: JSON.stringify(finalSlackChannels)
          };
          const result: FetchResult = await createNotificationGroup({
            variables: { group },
          });
          if (result) {
            showSuccessToast('Created notification group successfully.');
            router.push('/contact');
          }
        }
      } catch (error) {
        showErrorToast('Error creating notification group.');
      }
    });
  };

  return {
    isPending,
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
    onHandleSubmit
  };
};

export const useContactGroupEdit = (contactId: string): IUseContact => {
  const {
    state: { user }
  } = useContext(MonitorContext);
  const [notificationGroup, setNotificationGroup] = useState<INotificationGroup>({
    groupName: '',
    emails: []
  });
  const [itemInput, setItemInput] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [slackChannels, setSlackChannels] = useState<ISlackChannel[]>([]);
  const [slackInput, setSlackInput] = useState<ISlackChannelInput>(EMPTY_SLACK_INPUT);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [updateNotificationGroup] = useMutation(UPDATE_NOTIFICATION_GROUP);
  const userData = apolloClient.readQuery({
    query: CHECK_CURRENT_USER
  });

  const addSlackChannel = (): void => {
    if (!slackInput.name || !slackInput.webhookUrl) {
      return;
    }
    setSlackChannels((channels: ISlackChannel[]) => [...channels, { ...slackInput }]);
    setSlackInput(EMPTY_SLACK_INPUT);
  };

  const removeSlackChannel = (index: number): void => {
    setSlackChannels((channels: ISlackChannel[]) => channels.filter((_, itemIndex: number) => itemIndex !== index));
  };

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        if (emails.length > 0 && notificationGroup.groupName) {
          const finalSlackChannels: ISlackChannel[] =
            slackInput.name && slackInput.webhookUrl ? [...slackChannels, { ...slackInput }] : slackChannels;
          const group = {
            ...notificationGroup,
            emails: JSON.stringify(emails),
            slack: JSON.stringify(finalSlackChannels)
          };
          const result = await updateNotificationGroup({
            variables: {
              notificationId: parseInt(contactId),
              group
            }
          });
          if (result) {
            router.push('/contact');
            showSuccessToast('Updated notification group successfully.');
          }
        }
      } catch (error) {
        showErrorToast('Error updating notification group.');
      }
    });
  };

  useEffect(() => {
    if (userData) {
      const { notifications } = userData.checkCurrentUser;
      const notification = find(notifications, (notification: INotification) => notification.id === contactId);
      setNotificationGroup({
        userId: user?.id,
        groupName: notification?.groupName,
        emails: notification?.emails! ? JSON.parse(notification?.emails!) : ''
      });
      setEmails(notification?.emails! ? JSON.parse(notification?.emails!) : []);
      setSlackChannels(notification?.slack ? JSON.parse(notification?.slack) : []);
    }
  }, [userData, user?.id, contactId]);

  return {
    isPending,
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
    onHandleSubmit,
  };
};
