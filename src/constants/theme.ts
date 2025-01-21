import { DefaultTheme } from "styled-components/native";

const fontSize = {
  captionSm: "10px",
  captionBase: "12px",
  mainSm: "15px",
  mainBase: "17px",
  title: "24px",
};

const fontFamily = {
  nsLight: "nanumSquareNeoLight",
  nsRegular: "nanumSquareNeoRegular",
  nsBold: "nanumSquareNeoBold",
  nsExtraBold: "nanumSquareNeoExtraBold",
  nsHeavy: "nanumSquareNeoHeavy",
};

const borderRadius = {
  smallBox: "20px",
  largeBox: "30px",
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
