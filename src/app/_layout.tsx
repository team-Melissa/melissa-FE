import queryClient from '@/src/libs/queryClient';
import { ModalsProvider } from '@/src/modules/modal';
import { NotificationProvider } from '@/src/modules/notification';
import { SentryProvider } from '@/src/modules/sentry';
import { ToastsRoot } from '@/src/modules/toast';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { PortalProvider } from '@gorhom/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useEasUpdate } from '../hooks/useEasUpdate';
import { useInitializeFonts } from '../hooks/useInitializeFonts';

SplashScreen.preventAutoHideAsync();

/**
 * @description 폰트 로딩, 라이브러리 provider, 공용 스타일 컴포넌트로 감싸는 레이아웃
 */
export default function RootLayout() {
  const isFontReady = useInitializeFonts();
  const isEasUpdateReady = useEasUpdate();
  useReactQueryDevTools(queryClient);

  const isReady = isFontReady && isEasUpdateReady;

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SentryProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <GestureHandlerRootView>
              <ModalsProvider>
                <PortalProvider>
                  <StatusBar style="dark" />
                  <Slot />
                  <ToastsRoot />
                </PortalProvider>
              </ModalsProvider>
            </GestureHandlerRootView>
          </KeyboardProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </SentryProvider>
  );
}
