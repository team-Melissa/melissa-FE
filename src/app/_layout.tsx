import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "@/src/constants/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/src/libs/queryClient";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeSecureValue } from "../libs/secureStorage";
import { removeStorageValue } from "../libs/mmkv";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

/**
 * @description 필요한 Provider들을 제공하는 레이아웃
 */
function ProviderLayout() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SafeLayout>
          <RemoveAllTokenBtn />
          <RemoveAccessTokenBtn />
          <Slot />
        </SafeLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

const RemoveAllTokenBtn = () => {
  const removeTokens = async () => {
    removeStorageValue("accessToken");
    await removeSecureValue("refreshToken");
  };

  return (
    <FloatingButton onPress={removeTokens}>
      <Text>토큰 전체 삭제 버튼</Text>
    </FloatingButton>
  );
};

const RemoveAccessTokenBtn = () => {
  const removeTokens = () => {
    removeStorageValue("accessToken");
  };

  return (
    <FloatingRightButton onPress={removeTokens}>
      <Text>엑세스 토큰 삭제 버튼</Text>
    </FloatingRightButton>
  );
};

const FloatingButton = styled.TouchableOpacity`
  width: 200px;
  height: 100px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const FloatingRightButton = styled(FloatingButton)`
  top: 60px;
`;

export default ProviderLayout;
