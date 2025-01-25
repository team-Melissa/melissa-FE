import * as S from "./styles";

function KakaoBtn() {
  return (
    <S.Btn>
      <S.Image source={require("@/assets/images/kakao.svg")} contentFit="contain" />
      <S.Text>카카오 로그인</S.Text>
    </S.Btn>
  );
}

export default KakaoBtn;
