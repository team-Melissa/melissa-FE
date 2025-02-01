import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
`;

export const BetweenBox = styled(SafeAreaView)`
  flex: 1;
  padding: 0px 0px ${responsiveToPx("120px")} 0px;
  justify-content: space-between;
  align-items: center;
`;

export const AnimatedHeaderBox = styled(Animated.View)`
  width: 100%;
  height: 17%;
  justify-content: center;
  align-items: center;
`;

export const HeaderBtn = styled.TouchableOpacity`
  padding: ${responsiveToPx("14px")};
`;

export const HeaderText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  letter-spacing: ${responsiveToPx("11px")};
`;

export const ProgressBarWrapper = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${responsiveToPx("10px")};
`;

export const AnimatedBodyBox = styled(Animated.View)`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionBox = styled.View`
  width: 80%;
  margin-top: ${responsiveToPx("36px")};
`;

export const ButtonBox = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${responsiveToPx("24px")};
`;

export const QuestionText = styled.Text`
  align-self: baseline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${responsiveToPx("40px")};
  padding-bottom: ${responsiveToPx("16px")};
`;
