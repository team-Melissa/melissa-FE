import responsiveToPx from "@/src/utils/responsiveToPx";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
`;

export const HeaderBox = styled.View`
  width: 100%;
  height: ${responsiveToPx("80px")};
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsiveToPx("28px")};
  height: ${responsiveToPx("28px")};
  justify-content: center;
  align-items: center;
`;
