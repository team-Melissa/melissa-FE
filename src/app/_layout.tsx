import { theme } from '@/src/constants/theme';
import queryClient from '@/src/libs/queryClient';
import { ModalsProvider } from '@/src/modules/modal';
import { NotificationProvider } from '@/src/modules/notification';
import { SentryProvider } from '@/src/modules/sentry';
import { ToastsRoot } from '@/src/modules/toast';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { useEasUpdate } from '../hooks/useEasUpdate';
import { useInitializeFonts } from '../hooks/useInitializeFonts';
import { initializeApp } from '../utils/initializeApp';

SplashScreen.preventAutoHideAsync();

/**
 * @description 폰트 로딩, 라이브러리 provider, 공용 스타일 컴포넌트로 감싸는 레이아웃
 */
export default function RootLayout() {
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
            <GestureHandlerRootView>
              <ModalsProvider>
                <StatusBar style="dark" />
                <Slot />
                <ToastsRoot />
              </ModalsProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </ThemeProvider>
      </NotificationProvider>
    </SentryProvider>
  );
}
