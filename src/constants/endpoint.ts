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
  },
};

export default endpoint;
