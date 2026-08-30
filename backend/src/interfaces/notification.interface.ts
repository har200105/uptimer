
export interface INotificationDocument {
    id?: number;
    userId: number;
    groupName: string;
    emails: string;
    slack?: string;
    createdAt?: Date;
  }

  export interface ISlackChannel {
    name: string;
    webhookUrl: string;
    memberIds?: string;
  }

  export interface IEmailLocals {
    sender?: string;
    appLink: string;
    appName: string;
    subject?: string;
    username?: string;
  }
