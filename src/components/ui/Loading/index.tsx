import { ActivityIndicator } from "react-native";
import * as S from "./styles";

function Loading() {
  return (
    <S.CenterView>
      <ActivityIndicator size="large" />
    </S.CenterView>
  );
}

export default Loading;
