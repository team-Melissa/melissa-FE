import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/styles/theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack />
    </ThemeProvider>
  );
}
