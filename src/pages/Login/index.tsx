import KakaoBtn from "./KakaoBtn";
import GoogleBtn from "./GoogleBtn";
import AppleBtn from "./AppleBtn";
import * as S from "./styles";

function LoginPage() {
  return (
    <S.ContentBox>
      <S.TextBox>
        <S.TitleText>MELISSA 에</S.TitleText>
        <S.TitleText>오신 것을 환영합니다.</S.TitleText>
      </S.TextBox>
      <S.ButtonBox>
        <KakaoBtn />
        <GoogleBtn />
        <AppleBtn />
      </S.ButtonBox>
    </S.ContentBox>
  );
}
export default LoginPage;
