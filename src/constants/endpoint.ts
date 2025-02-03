const endpoint = {
  auth: {
    kakao: "/api/v1/auth/kakao",
    google: "/api/v1/auth/google",
    apple: "/api/v1/auth/apple",
    logout: "/api/v1/auth/logout",
    refresh: "/api/v1/auth/refresh",
  },
  aiProfile: "/api/v1/ai-profiles",
  setting: {
    checkNew: "/api/v1/user-settings/check-new",
    register: "/api/v1/user-settings/register",
    getSetting: "/api/v1/user-settings",
  },
  thread: {
    chat: "/api/v1/chats",
    send: "/api/v1/chats/message",
    changeAi: "/api/v1/chats/ai-profile",
  },
  calendar: {
    month: "/api/v1/calender/month",
    day: "/api/v1/calender/day",
  },
};

export default endpoint;
