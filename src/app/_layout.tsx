import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { ModalsProvider } from "@/src/modules/modal";
import { NotificationProvider } from "@/src/modules/notification";
import { SentryProvider } from "@/src/modules/sentry";
import { ToastsRoot } from "@/src/modules/toast";
import { theme } from "@/src/constants/theme";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "@/src/utils/initializeApp";

SplashScreen.preventAutoHideAsync();

/**
 * @description 폰트 로딩, 라이브러리 provider, 공용 스타일 컴포넌트로 감싸는 레이아웃
 */
function RootLayout() {
  useReactQueryDevTools(queryClient);
  const [isReady, setIsReady] = useState<boolean>(false);

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
    <SentryProvider>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ModalsProvider>
              <StatusBar style="dark" />
              <Slot />
              <ToastsRoot />
            </ModalsProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </NotificationProvider>
    </SentryProvider>
  );
}

export default RootLayout;
