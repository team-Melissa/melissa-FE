import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginContainer from "@/src/features/login/containers/LoginContainer";

/**
 * @description 로그인 페이지의 라우터
 */
export default function LoginRouter() {
  return (
    <SafeView>
      <LoginContainer />
    </SafeView>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;
