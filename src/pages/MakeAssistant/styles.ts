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

export const AnimatedHeaderBox = styled(Animated.View)`
  width: 100%;
  height: 17%;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.mainBase};
  letter-spacing: 11px;
`;

export const ProgressBarWrapper = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const AnimatedBodyBox = styled(Animated.View)`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionBox = styled.View`
  width: 80%;
  margin-top: 36px;
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

// ----------------------- ProgressBar ---------------------------------

export const ProgressBarBox = styled.View`
  width: 60%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const AnimatedProgressBar = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
