import Svg, { Path, type SvgProps } from 'react-native-svg';

export const IconArrowRight = (props: SvgProps) => {
  return (
    <Svg width="11" height="20" viewBox="0 0 11 20" fill="none" {...props}>
      <Path
        d="M1.59998 1.59998L8.59998 9.59998L1.59998 17.6"
        stroke="#F4EBD4"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
