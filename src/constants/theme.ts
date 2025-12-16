import type { TFontName } from '../types/fonts';

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
