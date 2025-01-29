import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";
import styled, { ThemeProvider } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/src/constants/theme";
import queryClient from "@/src/libs/queryClient";
import initializeApp from "../utils/initializeApp";

SplashScreen.preventAutoHideAsync();

/**
 * @description 필요한 Provider들을 제공하는 레이아웃
 */
function ProviderLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initializeApp(setIsReady);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SafeLayout>
          <Slot />
        </SafeLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

export default ProviderLayout;
