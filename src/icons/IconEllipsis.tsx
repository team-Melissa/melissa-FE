import Svg, { Circle, type SvgProps } from "react-native-svg";

export const IconEllipsis = ({ fill, ...props }: SvgProps) => {
  return (
    <Svg width="35" height="35" viewBox="0 0 35 35" fill="none" {...props}>
      <Circle cx="17.5" cy="17.5" r="1.5" fill={fill} />
      <Circle cx="17.5" cy="23" r="1.5" fill={fill} />
      <Circle cx="17.5" cy="12" r="1.5" fill={fill} />
    </Svg>
  );
};
