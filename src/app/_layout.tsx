import * as SplashScreen from "expo-splash-screen";
import * as Sentry from "@sentry/react-native";
import { StatusBar } from "expo-status-bar";
import { isRunningInExpoGo } from "expo";
import { Slot, useNavigationContainerRef } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "@/src/utils/initializeApp";

SplashScreen.preventAutoHideAsync();

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  debug: __DEV__,
  tracesSampleRate: __DEV__ ? 1.0 : 0.3,
  _experiments: {
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
  },
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllImages: true,
      maskAllText: true,
      maskAllVectors: true,
    }),
    navigationIntegration,
  ],
  enableNativeFramesTracking: !isRunningInExpoGo(),
});

/**
 * @description 폰트 로딩, 라이브러리 provider, 공용 스타일 컴포넌트로 감싸는 레이아웃
 */
function RootLayout() {
  useReactQueryDevTools(queryClient);
  const ref = useNavigationContainerRef();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (ref?.current) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    initializeApp(setIsReady);
  }, []);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Slot />
        <Toast />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);
