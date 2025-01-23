import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

export const CenteringBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.mainBase};
  padding-bottom: 30px;
`;

export const Bold = styled(InfoText)`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
`;

// ----------------------- Question ---------------------------------

export const BetweenBox = styled.View`
  flex: 1;
  padding: 0px 0px 120px 0px;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderBox = styled.View`
  width: 100%;
  height: 20%;

  justify-content: center;
  align-items: center;
`;

export const ProgressBarBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AnimatedBodyBox = styled(Animated.View)`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionBox = styled.View`
  width: 80%;
`;

export const ButtonBox = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const QuestionText = styled.Text`
  align-self: baseline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.title};
  line-height: 40px;
  padding-bottom: 16px;
`;
