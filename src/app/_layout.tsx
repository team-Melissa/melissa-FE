import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/src/libs/queryClient";

SplashScreen.preventAutoHideAsync();

/**
 * @description 필요한 Provider들을 제공하는 레이아웃
 */
function ProviderLayout() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default ProviderLayout;
