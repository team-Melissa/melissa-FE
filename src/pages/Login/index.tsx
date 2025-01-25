import Button from "@/src/components/ui/Button";
import * as S from "./styles";
import KakaoBtn from "./KakaoBtn";

function LoginPage() {
  return (
    <S.ContentBox>
      <S.TextBox>
        <S.TitleText>MELISSA 에</S.TitleText>
        <S.TitleText>오신 것을 환영합니다.</S.TitleText>
      </S.TextBox>
      <S.ButtonBox>
        <KakaoBtn />
        <Button color="white" textColor="black" fontFamily="nsBold" borderRadius="sm">
          Google
        </Button>
        <Button color="gray" textColor="white" fontFamily="nsBold">
          Apple
        </Button>
      </S.ButtonBox>
    </S.ContentBox>
  );
}
export default LoginPage;
