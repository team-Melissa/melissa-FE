import { DefaultTheme } from "styled-components/native";
import responsiveToPx from "../utils/responsiveToPx";

const fontSize = {
  captionSm: responsiveToPx("10px"),
  captionBase: responsiveToPx("12px"),
  mainSm: responsiveToPx("15px"),
  mainBase: responsiveToPx("17px"),
  title: responsiveToPx("24px"),
};

const fontFamily = {
  nsLight: "nanumSquareNeoLight",
  nsRegular: "nanumSquareNeoRegular",
  nsBold: "nanumSquareNeoBold",
  nsExtraBold: "nanumSquareNeoExtraBold",
  nsHeavy: "nanumSquareNeoHeavy",
};

const borderRadius = {
  sm: responsiveToPx("20px"),
  lg: responsiveToPx("30px"),
};

const colors = {
  white: "#FFFFFF",
  whiteBlue: "F0F5F8",
  skyBlue: "#CFE5E7",
  blue: "#9FD6FF",
  deepGreen: "#7BBBBB",
  green: "#94D4C1",
  red: "#F4ADB0",
  yellow: "#F3BB64",
  purple: "#AA94D4",
  black: "#000000",
  assistantChat: "#575757",
  userChat: "#353535",
  gray: "#AAAAAA",
};

export const theme: DefaultTheme = {
  fontSize,
  fontFamily,
  borderRadius,
  colors,
};

export type Fontsize = typeof fontSize;
export type FontFamily = typeof fontFamily;
export type BorderRadius = typeof borderRadius;
export type Colors = typeof colors;
