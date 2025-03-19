import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

export const AssistantListLayout = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const ItemLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ItemBox = styled.TouchableOpacity`
  width: ${responsiveToPx("320px")};
  height: ${responsiveToPx("540px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: space-evenly;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.black};
`;
