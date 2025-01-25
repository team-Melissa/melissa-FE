import * as S from "./styles";

function GoogleBtn() {
  return (
    <S.Btn>
      <S.Image source={require("@/assets/images/google.svg")} contentFit="contain" />
      <S.Text>Google 로그인</S.Text>
    </S.Btn>
  );
}

export default GoogleBtn;
