// TODO: 삭제

/**
 * @deprecated
 */
const endpoint = {
  aiProfile: {
    aiProfilesV1: '/api/v1/ai-profiles',
    aiProfilesV2: '/api/v2/ai-profiles',
    recent: '/api/v1/ai-profiles/recent',
  },
  setting: {
    checkNew: '/api/v1/user-settings/check-new',
    register: '/api/v1/user-settings/register',
    setting: '/api/v1/user-settings',
  },
  thread: {
    chat: '/api/v1/chats',
    send: '/api/v1/chats/message',
    changeAi: '/api/v1/chats/ai-profile',
    summary: '/api/v2/summary',
  },
  calendar: {
    month: '/api/v1/calender/month',
    day: '/api/v1/calender/day',
    diaries: '/api/v1/calender/month/summary',
    createDiary: '/api/v2/chats/manual',
  },
} as const;

export default endpoint;
