import Svg, { Path, type SvgProps } from 'react-native-svg';
import { COLOR } from '../constants/theme';

export const IconPlus = (props: SvgProps) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M3 10L10 10L17 10" stroke={COLOR.sub1} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M10 17V10V3" stroke={COLOR.sub1} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
};
