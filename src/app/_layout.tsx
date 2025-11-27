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
import { initializeApp } from "../utils/initializeApp";
import { useInitializeFonts } from "../hooks/useInitializeFonts";
import { useEasUpdate } from "../hooks/useEasUpdate";

SplashScreen.preventAutoHideAsync();

/**
 * @description 폰트 로딩, 라이브러리 provider, 공용 스타일 컴포넌트로 감싸는 레이아웃
 */
function RootLayout() {
  // TODO: 삭제 예정
  const [isRegacyReady, setIsRegacyReady] = useState<boolean>(false);

  useReactQueryDevTools(queryClient);
  const isFontReady = useInitializeFonts();
  const isEasUpdateReady = useEasUpdate();
  const isReady = isFontReady && isEasUpdateReady && isRegacyReady;

  // TODO: 삭제 예정
  useEffect(() => {
    initializeApp(setIsRegacyReady);
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
