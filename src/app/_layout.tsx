import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import initializeApp from "@/src/utils/initializeApp";
import queryClient from "@/src/libs/queryClient";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initializeApp(setIsReady);
  }, []);

  if (!isReady) return null;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
