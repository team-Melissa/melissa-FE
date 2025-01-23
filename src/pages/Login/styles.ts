import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeLayout = styled(SafeAreaView)`
  flex: 1;
`;

export const ContentBox = styled.View`
  flex: 1;
  padding: 80px 0px;
  justify-content: space-between;
`;

export const TextBox = styled.View`
  align-self: center;
  flex: 1;
  width: 80%;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.title};
  padding-bottom: 16px;
`;

export const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
