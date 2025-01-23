import * as S from "./styles";

/**
 * @description SplashScreen이 닫혀도 필요한 시간동안 더 띄워두기 위한 컴포넌트
 */
function Splash(): JSX.Element {
  return (
    <S.SafeLayout>
      <S.LogoImage source={require("@/assets/images/splash-icon.png")} />
    </S.SafeLayout>
  );
}

export default Splash;
