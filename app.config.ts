import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Melissa",
  slug: "melissa-FE",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    usesAppleSignIn: true,
    supportsTablet: true,
    bundleIdentifier: "com.melissa.melissaFE",
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
  plugins: [
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
        kotlinVersion: "1.9.0",
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
          extraMavenRepos: ["https://devrepo.kakao.com/nexus/content/groups/public/"],
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "66d135c5-0ce6-4d4c-b773-53238a652ce4",
    },
  },
});
