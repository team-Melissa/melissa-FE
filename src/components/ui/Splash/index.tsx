import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * @description SplashScreen이 닫혀도 필요한 시간동안 더 띄워두기 위한 컴포넌트
 */
function Splash(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Loading... Splash</Text>
    </SafeAreaView>
  );
}

export default Splash;
