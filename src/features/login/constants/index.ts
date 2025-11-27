import type { OAuthProvider } from "@/src/types/commonTypes";

export const loginProviderLabels = {
  KAKAO: "Kakao",
  GOOGLE: "Google",
  APPLE: "Apple",
} satisfies Record<OAuthProvider, string>;
