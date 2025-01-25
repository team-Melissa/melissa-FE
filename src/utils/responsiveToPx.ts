import { Dimensions } from "react-native";

/**
 * Figma 화면 사이즈 (가로 기준)
 */
const baseDesignScreenSize = 430;
const { width } = Dimensions.get("window");

/**
 * @description 모바일 화면 크기에 맞게 조절된 px 반환
 */
function responsiveToPx(pixel: string): string {
  const screenRatio = width / baseDesignScreenSize;
  return `${parseInt(pixel) * screenRatio}px`;
}

export default responsiveToPx;
