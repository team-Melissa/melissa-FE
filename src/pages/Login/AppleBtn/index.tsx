import * as S from "./styles";

function AppleBtn() {
  return (
    <S.Btn>
      <S.Image source={require("@/assets/images/apple.svg")} contentFit="contain" />
      <S.Text>Apple로 로그인</S.Text>
    </S.Btn>
  );
}

export default AppleBtn;
