import { BorderRadius, Colors, FontFamily, Fontsize } from '@/src/constants/theme';
import { PropsWithChildren } from 'react';
import { TouchableOpacityProps } from 'react-native';

export type BtnStyle = {
  color?: keyof Colors;
  textColor?: keyof Colors;
  fontFamily?: keyof FontFamily;
  fontSize?: keyof Fontsize;
  borderRadius?: keyof BorderRadius;
};

export type BtnProps = BtnStyle & TouchableOpacityProps & PropsWithChildren;
