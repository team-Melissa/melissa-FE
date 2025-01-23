import { SafeAreaView } from "react-native-safe-area-context";
import { Image as Img } from "expo-image";
import styled from "styled-components/native";

/**
 * @description SplashScreen이 닫혀도 필요한 시간동안 더 띄워두기 위한 컴포넌트
 */
function Splash(): JSX.Element {
  return (
    <Layout>
      <Image source={require("@/assets/images/splash-icon.png")} />
    </Layout>
  );
}

const Layout = styled(SafeAreaView)`
  background-color: "#fff";
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled(Img)`
  width: 200px;
  height: 200px;
`;

export default Splash;
