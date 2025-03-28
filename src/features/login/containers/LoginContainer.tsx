import { Platform } from "react-native";
import styled from "styled-components/native";
import Loading from "@/src/components/ui/Loading";
import responsiveToPx from "@/src/utils/responsiveToPx";
import useLogin from "../hooks/useLogin";
import LoginTitle from "../components/LoginTitle";
import LoginButton from "../components/LoginButton";

export default function LoginContainer() {
  const { isPending, kakaoMutate, googleMutate, appleMutate } = useLogin();

  if (isPending) {
    return <Loading />;
  }

  return (
    <ContentBox>
      <LoginTitle />
      <ButtonBox>
        <LoginButton provider="kakao" onPress={kakaoMutate}>
          카카오로 로그인
        </LoginButton>
        <LoginButton provider="google" onPress={googleMutate}>
          Google로 로그인
        </LoginButton>
        {Platform.OS === "ios" && (
          <LoginButton provider="apple" onPress={appleMutate}>
            Apple로 로그인
          </LoginButton>
        )}
      </ButtonBox>
    </ContentBox>
  );
}

const ContentBox = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  padding: ${responsiveToPx("80px")} 0px;
  justify-content: space-between;
`;

const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;
