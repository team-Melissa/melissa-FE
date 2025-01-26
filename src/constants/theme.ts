import { DefaultTheme } from "styled-components/native";
import responsiveToPx from "../utils/responsiveToPx";

const fontSize = {
  xs: responsiveToPx("10px"),
  sm: responsiveToPx("12px"),
  base: responsiveToPx("15px"),
  md: responsiveToPx("17px"),
  lg: responsiveToPx("20px"),
  xl: responsiveToPx("24px"),
  xxl: responsiveToPx("30px"),
  xxxl: responsiveToPx("36px"),
};

const fontFamily = {
  nsLight: "nanumSquareNeoLight",
  nsRegular: "nanumSquareNeoRegular",
  nsBold: "nanumSquareNeoBold",
  nsExtraBold: "nanumSquareNeoExtraBold",
  nsHeavy: "nanumSquareNeoHeavy",
  robotoMedium: "robotoMedium",
  playFairSc: "playFairSc",
};

const borderRadius = {
  sm: responsiveToPx("15px"),
  base: responsiveToPx("20px"),
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
  gray: "#D9D9D9",
  darkGray: "#858585",
};

const gap = {
  sm: responsiveToPx("4px"),
  base: responsiveToPx("8px"),
  lg: responsiveToPx("24px"),
};

export const theme: DefaultTheme = {
  fontSize,
  fontFamily,
  borderRadius,
  colors,
  gap,
};

export type Fontsize = typeof fontSize;
export type FontFamily = typeof fontFamily;
export type BorderRadius = typeof borderRadius;
export type Colors = typeof colors;
export type Gap = typeof gap;
