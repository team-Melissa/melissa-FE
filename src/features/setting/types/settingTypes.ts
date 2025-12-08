import type { SuccessDTO } from '@/src/types/commonTypes';

export type UserSettingDTO = SuccessDTO & {
  result: {
    sleepTime: string;
    notificationTime: string;
    notificationSummary: boolean;
  };
};

export type TDatePickerType = 'sleepTime' | 'notificationTime' | null;
