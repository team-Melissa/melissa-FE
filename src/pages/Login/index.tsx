import Button from "@/src/components/ui/Button";
import * as S from "./styles";

function LoginPage() {
  return (
    <S.SafeLayout>
      <S.ContentBox>
        <S.TextBox>
          <S.TitleText>MELISSA 에</S.TitleText>
          <S.TitleText>오신 것을 환영합니다.</S.TitleText>
        </S.TextBox>
        <S.ButtonBox>
          <Button color="yellow" textColor="black" fontFamily="nsBold" borderRadius="lg">
            Kakao
          </Button>
          <Button color="white" textColor="black" fontFamily="nsBold" borderRadius="sm">
            Google
          </Button>
          <Button color="gray" textColor="white" fontFamily="nsBold">
            Apple
          </Button>
        </S.ButtonBox>
      </S.ContentBox>
    </S.SafeLayout>
  );
}
export default LoginPage;
