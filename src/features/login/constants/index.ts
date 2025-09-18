import type { OAuthProvider } from "@/src/types/commonTypes";

export const logoPaths = {
  KAKAO: require("@/assets/images/kakao.svg"),
  GOOGLE: require("@/assets/images/google.svg"),
  APPLE: require("@/assets/images/apple.svg"),
} satisfies Record<OAuthProvider, any>;

export const backgroundColors = {
  KAKAO: "#fee500",
  GOOGLE: "#ffffff",
  APPLE: "#050708",
} satisfies Record<OAuthProvider, string>;

export const textOpacities = {
  KAKAO: 0.85,
  GOOGLE: 0.54,
  APPLE: 1,
} satisfies Record<OAuthProvider, number>;

export const textColors = {
  KAKAO: "#000000",
  GOOGLE: "#000000",
  APPLE: "#ffffff",
} satisfies Record<OAuthProvider, string>;

export const loginProviderLabels = {
  KAKAO: "카카오",
  GOOGLE: "구글",
  APPLE: "애플",
} satisfies Record<OAuthProvider, string>;
