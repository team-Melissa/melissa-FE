import Button from "@/src/components/ui/Button";
import * as S from "./styles";
import KakaoBtn from "./KakaoBtn";
import GoogleBtn from "./GoogleBtn";

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
        <Button color="gray" textColor="white" fontFamily="nsBold">
          Apple
        </Button>
      </S.ButtonBox>
    </S.ContentBox>
  );
}
export default LoginPage;
