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
