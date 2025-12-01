import { Path, Svg, type SvgProps } from "react-native-svg";

export const IconSearch = (props: SvgProps) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M13.816 20.7553C17.6878 20.7553 20.8322 17.6109 20.8322 13.7391C20.8322 9.86736 17.6878 6.7229 13.816 6.7229C9.94426 6.7229 6.7998 9.86736 6.7998 13.7391C6.7998 17.6109 9.94426 20.7553 13.816 20.7553Z"
        stroke="#6C5244"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.6743 18.9613L23.384 23.7373"
        stroke="#6C5244"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};
