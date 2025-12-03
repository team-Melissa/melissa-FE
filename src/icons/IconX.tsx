import Svg, { Path, type SvgProps } from 'react-native-svg';

export const IconX = (props: SvgProps) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M14.9497 5.05029L5.05029 14.9497M5.05029 5.05029L14.9497 14.9497"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
