import styled from "styled-components/native";
import { BtnStyle } from "./types";
import { Platform, StyleSheet } from "react-native";

export const Btn = styled.TouchableOpacity<Pick<BtnStyle, "color" | "borderRadius">>`
  width: 80%;
  padding: 16px;
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius ? theme.borderRadius[borderRadius] : theme.borderRadius.sm};
  background-color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.green)};
  justify-content: center;
  align-items: center;
`;

export const BtnText = styled.Text<Omit<BtnStyle, "color">>`
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? theme.fontFamily[fontFamily] : theme.fontFamily.nsExtraBold};
  font-size: ${({ fontSize, theme }) =>
    fontSize ? theme.fontSize[fontSize] : theme.fontSize.mainBase};
  color: ${({ textColor, theme }) => (textColor ? theme.colors[textColor] : theme.colors.white)};
`;

/**
 * @description AOS, IOS에서 최대한 동일한 box-shadow를 구현하기 위한 스타일시트
 */
export const { shadow } = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 25,
      },
    }),
  },
});
