import useLogin from "@/src/hooks/useLogin";
import Loading from "@/src/components/ui/Loading";
import LoginButton from "./LoginButton";
import * as S from "./styles";

function LoginPage() {
  const { isPending, kakaoMutate, googleMutate } = useLogin();

  const handleClickApple = () => {
    console.log("애플 버튼 클릭");
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <S.SafeView>
      <S.ContentBox>
        <S.TextBox>
          <S.Image source={require("@/assets/images/logo.svg")} contentFit="contain" />
          <S.MelissaText>Melissa</S.MelissaText>
          <S.TitleText>하루의 끝, 멜리사</S.TitleText>
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
    </S.SafeView>
  );
}
export default LoginPage;
