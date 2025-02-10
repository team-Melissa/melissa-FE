import { Dimensions } from "react-native";

/**
 * Figma 화면 사이즈 (가로 기준)
 */
const baseDesignScreenSize = 430;
const baseDesignScreenSizeByHeight = 932;
const { width, height } = Dimensions.get("window");

/**
 * @description 모바일 화면 크기에 맞게 조절된 px 반환
 */
function responsiveToPx(pixel: string): string {
  const screenRatio = width / baseDesignScreenSize;
  return `${(parseInt(pixel) * screenRatio).toFixed(2)}px`;
}

export function responsiveToPxByHeight(pixel: string): string {
  const screenRatioByHeight = height / baseDesignScreenSizeByHeight;
  return `${(parseInt(pixel) * screenRatioByHeight).toFixed(2)}px`;
}

export default responsiveToPx;
