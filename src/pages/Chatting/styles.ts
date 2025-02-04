import responsiveToPx from "@/src/utils/responsiveToPx";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
`;

export const FlexView = styled.View`
  flex: 1;
`;

export const HeaderBox = styled.View`
  flex: 0.12;
  justify-content: center;
  background-color: rebeccapurple;
`;
export const ScrollBox = styled.ScrollView`
  flex: 0.73;
  background-color: beige;
`;

export const TextInputBox = styled.View`
  flex: 0.15;
  background-color: crimson;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsiveToPx("28px")};
  height: ${responsiveToPx("28px")};
  justify-content: center;
  align-items: center;
`;
