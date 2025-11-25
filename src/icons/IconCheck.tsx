import Svg, { Path, type SvgProps } from "react-native-svg";

export const IconCheck = (props: SvgProps) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M14.9497 6.69092L8.92869 13.3103L5.0504 9.27782"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
