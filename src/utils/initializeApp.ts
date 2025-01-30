import * as Font from "expo-font";
import { Dispatch, SetStateAction } from "react";

/**
 * @description 필요한 모든 폰트를 로딩하는 함수
 */
const loadFonts = async () => {
  await Font.loadAsync({
    nanumSquareNeoLight: require("@/assets/fonts/NanumSquareNeo-light.ttf"),
    nanumSquareNeoRegular: require("@/assets/fonts/NanumSquareNeo-regular.ttf"),
    nanumSquareNeoBold: require("@/assets/fonts/NanumSquareNeo-bold.ttf"),
    nanumSquareNeoExtraBold: require("@/assets/fonts/NanumSquareNeo-extrabold.ttf"),
    nanumSquareNeoHeavy: require("@/assets/fonts/NanumSquareNeo-heavy.ttf"),
    robotoMedium: require("@/assets/fonts/Roboto-medium.ttf"),
    poetsenOneRegular: require("@/assets/fonts/PoetsenOne-Regular.ttf"),
  });
  console.log("폰트 로딩 완료");
};

// Todo: 추가로 스플래시 스크린에서 필요한 작업을 함수 형태로 구현하고, initializeApp의 Promise.all에 추가

/**
 * @description 초기 필수 로딩 작업들을 수행한 뒤, isReady를 true로 변경하고 splashscreen을 내리는 함수
 */
const initializeApp = async (setIsReady: Dispatch<SetStateAction<boolean>>) => {
  try {
    await Promise.all([loadFonts()]);
  } catch (e) {
    console.error(e);
    // Todo: 추가 에러 처리(폰트 로딩 실패 등)
  } finally {
    setIsReady(true);
  }
};

export default initializeApp;
