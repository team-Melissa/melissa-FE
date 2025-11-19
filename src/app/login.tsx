import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginContainer from "@/src/features/login/containers/LoginContainer";
import { Text } from "react-native";
import { getNotificationToken } from "../libs/mmkv";

/**
 * @description 로그인 페이지의 라우터
 */
export default function LoginRouter() {
  const token = getNotificationToken();

  return (
    <SafeView>
      <Text style={{ margin: 20, fontSize: 16 }}>{token}</Text>
      <LoginContainer />
    </SafeView>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;
