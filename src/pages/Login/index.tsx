import { login } from "@react-native-seoul/kakao-login";
import LoginButton from "./LoginButton";
import * as S from "./styles";

function LoginPage() {
  const handleClickKakao = async () => {
    console.log("카카오 버튼 클릭");
    try {
      const res = await login();
      console.log(res);
    } catch (e) {
      console.error(e);
      //Tood: 토스트 메시지 등으로 로그인 실패 안내
    }
  };

  const handleClickGoogle = () => {
    console.log("구글 버튼 클릭");
  };

  const handleClickApple = () => {
    console.log("애플 버튼 클릭");
  };

  return (
    <S.ContentBox>
      <S.TextBox>
        <S.TitleText>
          <S.MelissaText>Melissa</S.MelissaText> 에
        </S.TitleText>
        <S.TitleText>오신 것을 환영합니다.</S.TitleText>
      </S.TextBox>
      <S.ButtonBox>
        <LoginButton provider="kakao" onPress={handleClickKakao}>
          카카오로 로그인
        </LoginButton>
        <LoginButton provider="google" onPress={handleClickGoogle}>
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
