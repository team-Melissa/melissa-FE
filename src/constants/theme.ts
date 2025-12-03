// TODO: 삭제

import { DefaultTheme } from 'styled-components/native';
import type { TFontName } from '../types/fonts';
import responsiveToPx from '../utils/responsiveToPx';

export const SHADOW = {
  boxShadow: '0 0 10 0 rgba(23, 23, 23, 0.2)',
};

export const COLOR = {
  white: '#FFFFFF',
  black: '#000000',
  background: '#E1F0ED',
  weeks: '#82ACA4',
  main: '#00A887',
  title: '#6C5244',
  sub1: '#937261',
  sub2: '#F4EBD4',
} as const;

export const FONT_FAMILY = {
  pretendard400: 'pretendard400',
  pretendard500: 'pretendard500',
  pretendard600: 'pretendard600',
  pretendard700: 'pretendard700',
} satisfies Record<TFontName, TFontName>;

/**
 * @deprecated
 */
const fontSize = {
  xxs: responsiveToPx('8px'),
  xs: responsiveToPx('10px'),
  sm: responsiveToPx('12px'),
  base: responsiveToPx('15px'),
  md: responsiveToPx('17px'),
  lg: responsiveToPx('20px'),
  xl: responsiveToPx('24px'),
  xxl: responsiveToPx('30px'),
  xxxl: responsiveToPx('36px'),
  xxxxl: responsiveToPx('55px'),
};

/**
 * @deprecated
 */
const fontFamily = {
  nsLight: 'nanumSquareNeoLight',
  nsRegular: 'nanumSquareNeoRegular',
  nsBold: 'nanumSquareNeoBold',
  nsExtraBold: 'nanumSquareNeoExtraBold',
  nsHeavy: 'nanumSquareNeoHeavy',
  robotoMedium: 'robotoMedium',
  poetsenOne: 'poetsenOneRegular',
  podkovaRegular: 'podkovaRegular',
};

/**
 * @deprecated
 */
const borderRadius = {
  xs: responsiveToPx('5px'),
  sm: responsiveToPx('15px'),
  base: responsiveToPx('20px'),
  lg: responsiveToPx('30px'),
};

/**
 * @deprecated
 */
const colors = {
  white: '#FFFFFF',
  whiteBlue: '#F0F5F8',
  skyBlue: '#CFE5E7',
  blue: '#9FD6FF',
  deepGreen: '#7BBBBB',
  green: '#94D4C1',
  red: '#F4ADB0',
  yellow: '#F3BB64',
  purple: '#AA94D4',
  black: '#000000',
  assistantChat: '#575757',
  userChat: '#353535',
  gray: '#D9D9D9',
  darkGray: '#858585',
  textGray: '#242424',
  calendarGray: '#777777',
  calendarIcon: '#424242',
  calendarRed: '#FF5656',
  calendarBlue: '#4766FF',
  settingText: '#121212',
  settingSubText: '#AAAAAA',
  settingValueText: '#505050',
  diaryText: '#242424',
  placeholderText: '#979797',
  deleteAccount: '#CD3636',
};

/**
 * @deprecated
 */
const gap = {
  sm: responsiveToPx('4px'),
  base: responsiveToPx('8px'),
  md: responsiveToPx('12px'),
  lg: responsiveToPx('24px'),
  xxl: responsiveToPx('50px'),
};

/**
 * @deprecated
 */
export const theme: DefaultTheme = {
  fontSize,
  fontFamily,
  borderRadius,
  colors,
  gap,
};
/**
 * @deprecated
 */
export type Fontsize = typeof fontSize;
export type FontFamily = typeof fontFamily;
export type BorderRadius = typeof borderRadius;
export type Colors = typeof colors;
export type Gap = typeof gap;
