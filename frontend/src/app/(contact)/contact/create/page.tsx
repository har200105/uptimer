'use client';

import { FC, ReactElement } from 'react';
import { useContactGroupCreate } from '../../hooks/useContactGroup';
import PageLoader from '@/components/PageLoader';
import ContactForm from '../../components/ContactForm';

const CreateContact: FC = (): ReactElement => {
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
  } = useContactGroupCreate();

  return (
    <>
      {isPending ? (
        <PageLoader />
      ) : (
        <ContactForm
          label="Create Group"
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

export default CreateContact;