import type { ConfigContext, ExpoConfig } from 'expo/config';
import 'ts-node/register';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Melissa',
  slug: 'melissa',
  owner: 'teammelissa7',
  version: '1.3.4',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  ios: {
    usesAppleSignIn: true,
    supportsTablet: true,
    bundleIdentifier: 'com.melissa.melissaFE',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    blockedPermissions: ['android.permission.READ_MEDIA_IMAGES', 'android.permission.READ_MEDIA_VIDEO'],
    softwareKeyboardLayoutMode: 'pan',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    package: 'com.melissa.melissaFE',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  updates: {
    url: 'https://u.expo.dev/4faef966-3986-491e-b718-3bf6c7143451',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  plugins: [
    'expo-font',
    'expo-router',
    'expo-notifications',
    'expo-apple-authentication',
    '@sentry/react-native',
    'expo-web-browser',
    'expo-image',
    'expo-video',
    'expo-sharing',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#7bbbbb',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
        savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
        isAccessMediaLocationEnabled: true,
        granularPermissions: ['audio', 'photo'],
      },
    ],
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission: 'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
      },
    ],
    [
      '@react-native-seoul/kakao-login',
      {
        kakaoAppKey: process.env.KAKAO_APP_KEY,
        kotlinVersion: '2.1.20',
      },
    ],
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: process.env.GOOGLE_IOS_URL_SCHEME,
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '2.1.20',
          extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
        },
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        url: 'https://sentry.io/',
      },
    ],
    [
      'react-native-google-mobile-ads',
      {
        androidAppId: process.env.AD_MOB_ANDROID_APP_ID,
        iosAppId: process.env.AD_MOB_IOS_APP_ID,
      },
    ],
    [
      'expo-tracking-transparency',
      {
        userTrackingPermission: '맞춤형 광고 제공을 위해 추적 권한을 요청합니다.',
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
      projectId: '4faef966-3986-491e-b718-3bf6c7143451',
    },
  },
});
