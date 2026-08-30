'use client';

import { FC, ReactElement } from 'react';
import PageLoader from '@/components/PageLoader';
import { useContactGroupEdit } from '@/app/(contact)/hooks/useContactGroup';
import ContactForm from '@/app/(contact)/components/ContactForm';

interface EditContactGroupProps {
  params: {
    contactId: string;
  }
}

const EditContactGroup: FC<EditContactGroupProps> = ({ params }): ReactElement => {
  const {
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
  } = useContactGroupEdit(params.contactId);

  return (
    <>
      {isPending ? (
        <PageLoader />
      ) : (
        <ContactForm
          label="Update Group"
          notificationGroup={notificationGroup}
          emails={emails}
          itemInput={itemInput}
          slackChannels={slackChannels}
          slackInput={slackInput}
          setNotificationGroup={setNotificationGroup}
          setEmails={setEmails}
          setItemInput={setItemInput}
          setSlackInput={setSlackInput}
          addSlackChannel={addSlackChannel}
          removeSlackChannel={removeSlackChannel}
          onFormHandler={onHandleSubmit}
        />
      )}
    </>
  )
}

export default EditContactGroup;