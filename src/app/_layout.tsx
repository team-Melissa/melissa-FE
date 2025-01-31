import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Slot, usePathname } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "@/src/utils/initializeApp";
import IsNewUserProvider from "@/src/contexts/IsNewUserProvider";

SplashScreen.preventAutoHideAsync();

/**
 * @description 필요한 Provider들을 제공하는 레이아웃
 */
function ProviderLayout() {
  useReactQueryDevTools(queryClient);
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
        <IsNewUserProvider>
          <ColorView pathname={pathname} onLayout={onLayoutRootView}>
            <SafeLayout>
              <StatusBar />
              <Slot />
            </SafeLayout>
          </ColorView>
        </IsNewUserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const ColorView = styled.View<{ pathname: string }>`
  flex: 1;
  background-color: ${({ pathname }) => (pathname === "/login" ? "#f0f5f8" : "#ffffff")};
`;

const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

export default ProviderLayout;
