const endpoint = {
  auth: {
    kakao: "/api/v1/auth/kakao",
    google: "/api/v1/auth/google",
    apple: "/api/v1/auth/apple",
    logout: "/api/v1/auth/logout",
    delete: "/api/v1/user",
    refresh: "/api/v1/auth/refresh",
  },
  aiProfile: "/api/v1/ai-profiles",
  setting: {
    checkNew: "/api/v1/user-settings/check-new",
    register: "/api/v1/user-settings/register",
    setting: "/api/v1/user-settings",
  },
  thread: {
    chat: "/api/v1/chats",
    send: "/api/v1/chats/message",
    changeAi: "/api/v1/chats/ai-profile",
    summary: "/api/v1/summary",
  },
  calendar: {
    month: "/api/v1/calender/month",
    day: "/api/v1/calender/day",
    diaries: "/api/v1/calender/month/summary",
  },
};

export default endpoint;
