import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const CenteringBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding-bottom: ${responsiveToPx("30px")};
`;

export const Bold = styled(InfoText)`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
`;
