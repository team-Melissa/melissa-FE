import { QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Slot, usePathname } from "expo-router";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "../utils/initializeApp";

SplashScreen.preventAutoHideAsync();

/**
 * @description 필요한 Provider들을 제공하는 레이아웃
 */
function ProviderLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const pathname = usePathname();
  console.log(pathname);

  const onLayoutRootView = useCallback(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  useEffect(() => {
    initializeApp(setIsReady);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ColorView pathname={pathname} onLayout={onLayoutRootView}>
          <SafeLayout>
            <StatusBar />
            <Slot />
          </SafeLayout>
        </ColorView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const ColorView = styled(View)<{ pathname: string }>`
  flex: 1;
  background-color: ${({ pathname }) => (pathname === "/login" ? "#f0f5f8" : "#ffffff")};
`;

const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

export default ProviderLayout;
