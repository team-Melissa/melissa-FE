import Animated from "react-native-reanimated";
import styled from "styled-components/native";

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
