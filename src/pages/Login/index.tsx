import LoginButton from "./LoginButton";
import useLogin from "@/src/hooks/useLogin";
import * as S from "./styles";

function LoginPage() {
  const { isPending, kakaoMutate, googleMutate } = useLogin();

  const handleClickApple = () => {
    console.log("애플 버튼 클릭");
  };

  if (isPending) {
    return (
      <S.ContentBox>
        <S.TextBox>
          <S.TitleText>로그인 중입니다...</S.TitleText>
        </S.TextBox>
      </S.ContentBox>
    );
  }
  return (
    <S.ContentBox>
      <S.TextBox>
        <S.TitleText>
          <S.MelissaText>Melissa</S.MelissaText> 에
        </S.TitleText>
        <S.TitleText>오신 것을 환영합니다.</S.TitleText>
      </S.TextBox>
      <S.ButtonBox>
        <LoginButton provider="kakao" onPress={kakaoMutate}>
          카카오로 로그인
        </LoginButton>
        <LoginButton provider="google" onPress={googleMutate}>
          Google로 로그인
        </LoginButton>
        <LoginButton provider="apple" onPress={handleClickApple}>
          Apple로 로그인
        </LoginButton>
      </S.ButtonBox>
    </S.ContentBox>
  );
}
export default LoginPage;
