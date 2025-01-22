import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "@/src/utils/initializeApp";
import Splash from "@/src/components/ui/Splash";

SplashScreen.preventAutoHideAsync();

/**
 * @description 모든 초기 로직을 실행시키고 Provider로 감싸주는 레이아웃
 */
export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initializeApp(setIsReady);
  }, []);

  if (!isReady) return <Splash />;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
