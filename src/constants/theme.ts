import { DefaultTheme } from "styled-components/native";
import responsiveToPx from "../utils/responsiveToPx";

const fontSize = {
  xxs: responsiveToPx("8px"),
  xs: responsiveToPx("10px"),
  sm: responsiveToPx("12px"),
  base: responsiveToPx("15px"),
  md: responsiveToPx("17px"),
  lg: responsiveToPx("20px"),
  xl: responsiveToPx("24px"),
  xxl: responsiveToPx("30px"),
  xxxl: responsiveToPx("36px"),
  xxxxl: responsiveToPx("55px"),
};

const fontFamily = {
  nsLight: "nanumSquareNeoLight",
  nsRegular: "nanumSquareNeoRegular",
  nsBold: "nanumSquareNeoBold",
  nsExtraBold: "nanumSquareNeoExtraBold",
  nsHeavy: "nanumSquareNeoHeavy",
  robotoMedium: "robotoMedium",
  poetsenOne: "poetsenOneRegular",
  podkovaRegular: "podkovaRegular",
};

const borderRadius = {
  xs: responsiveToPx("5px"),
  sm: responsiveToPx("15px"),
  base: responsiveToPx("20px"),
  lg: responsiveToPx("30px"),
};

const colors = {
  white: "#FFFFFF",
  whiteBlue: "#F0F5F8",
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
  textGray: "#242424",
  calendarGray: "#777777",
  calendarIcon: "#424242",
  calendarRed: "#FF5656",
  calendarBlue: "#4766FF",
  settingText: "#121212",
  settingSubText: "#AAAAAA",
  settingValueText: "#505050",
  diaryText: "#242424",
  placeholderText: "#979797",
  deleteAccount: "#CD3636",
};

const gap = {
  sm: responsiveToPx("4px"),
  base: responsiveToPx("8px"),
  md: responsiveToPx("12px"),
  lg: responsiveToPx("24px"),
  xxl: responsiveToPx("50px"),
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
