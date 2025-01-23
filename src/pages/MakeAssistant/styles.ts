import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

export const CenteringBox = styled.View`
  height: 100%;
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

export const QuestionText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.title};
  padding-bottom: 16px;
`;
