import type { ExpoConfig, ConfigContext } from "expo/config";
import "ts-node/register";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Melissa",
  slug: "melissa",
  owner: "teammelissa7",
  version: "1.2.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    usesAppleSignIn: true,
    supportsTablet: true,
    bundleIdentifier: "com.melissa.melissaFE",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.melissa.melissaFE",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  updates: {
    url: "https://u.expo.dev/4faef966-3986-491e-b718-3bf6c7143451",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  plugins: [
    "expo-font",
    "expo-router",
    "expo-apple-authentication",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#7bbbbb",
      },
    ],
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission: "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
      },
    ],
    [
      "@react-native-seoul/kakao-login",
      {
        kakaoAppKey: process.env.KAKAO_APP_KEY,
        kotlinVersion: "1.9.25",
      },
    ],
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme: process.env.GOOGLE_IOS_URL_SCHEME,
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: "35.0.0",
          kotlinVersion: "1.9.25",
          extraMavenRepos: ["https://devrepo.kakao.com/nexus/content/groups/public/"],
        },
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        url: "https://sentry.io/",
      },
    ],
    ["./plugins/android-keyboard-fix.ts"], // Todo: RN에서 MainActivity.kt에 setPadding을 넣어줄 때까지 유지
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "4faef966-3986-491e-b718-3bf6c7143451",
    },
  },
});
