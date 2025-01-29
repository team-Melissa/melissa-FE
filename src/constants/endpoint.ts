const endpoint = {
  auth: {
    kakao: "/api/v1/auth/kakao",
    google: "/api/v1/auth/google",
    apple: "/api/v1/auth/apple",
    logout: "/api/v1/auth/logout",
    refresh: "/api/v1/auth/refresh",
  },
  setting: {
    checkNew: "/api/v1/user-settings/check-new",
  },
};

export default endpoint;
