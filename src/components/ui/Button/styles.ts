import styled from "styled-components/native";
import { BtnStyle } from "./types";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const Btn = styled.TouchableOpacity<Pick<BtnStyle, "color" | "borderRadius">>`
  width: 80%;
  padding: ${responsiveToPx("16px")};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius ? theme.borderRadius[borderRadius] : theme.borderRadius.sm};
  background-color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.green)};
  justify-content: center;
  align-items: center;
`;

export const BtnText = styled.Text<Omit<BtnStyle, "color">>`
  font-family: ${({ fontFamily, theme }) =>
    fontFamily ? theme.fontFamily[fontFamily] : theme.fontFamily.nsExtraBold};
  font-size: ${({ fontSize, theme }) => (fontSize ? theme.fontSize[fontSize] : theme.fontSize.md)};
  color: ${({ textColor, theme }) => (textColor ? theme.colors[textColor] : theme.colors.white)};
`;
