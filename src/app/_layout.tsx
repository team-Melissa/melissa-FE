import * as SplashScreen from "expo-splash-screen";
import * as Sentry from "@sentry/react-native";
import { StatusBar } from "expo-status-bar";
import { isRunningInExpoGo } from "expo";
import { Slot, useNavigationContainerRef } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { ToastsRoot } from "@/src/modules/toast";
import { theme } from "@/src/constants/theme";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "@/src/utils/initializeApp";
import { ModalsProvider, useModal } from "../modules/modal";
import NoticeModal from "@/src/features/main/components/modals/NoticeModal";

SplashScreen.preventAutoHideAsync();

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

!__DEV__ &&
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    debug: false,
    tracesSampleRate: 0.3,
    _experiments: {
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.3,
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
 * @deprecated 1.3.0 이후 제거 예정
 * //TODO: 삭제 예정
 */
function AppNoticeModal() {
  const modal = useModal();

  useEffect(() => {
    modal.open((props) => <NoticeModal {...props} />);
  }, [modal]);

  return null;
}

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
        <ModalsProvider>
          <AppNoticeModal />
          <StatusBar style="dark" />
          <Slot />
          <ToastsRoot />
        </ModalsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);
