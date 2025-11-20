import { useFonts } from "expo-font";
import type { FontSource } from "expo-font";
import type { TFontName } from "../types/fonts";

const fontsMap = {
  pretendard400: require("@/assets/fonts/pretendard-400.otf"),
  pretendard500: require("@/assets/fonts/pretendard-500.otf"),
  pretendard600: require("@/assets/fonts/pretendard-600.otf"),
  pretendard700: require("@/assets/fonts/pretendard-700.otf"),
} satisfies Record<TFontName, FontSource>;

/**
 * @description 폰트를 로드하는 훅입니다.
 */
export const useInitializeFonts = () => {
  const [isReady] = useFonts(fontsMap);
  return isReady;
};
