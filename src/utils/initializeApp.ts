import * as Font from "expo-font";
import * as Updates from "expo-updates";
import { Dispatch, SetStateAction } from "react";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";

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
    podkovaRegular: require("@/assets/fonts/Podkova-Regular.ttf"),
  });
  console.log("폰트 로딩 완료");
};

/**
 * @description EAS Update가 존재하면, 다운로드 후 앱 재실행을 수행하는 함수
 */
const fetchEasUpdate = async () => {
  try {
    if (__DEV__) return;

    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description 초기 필수 로딩 작업들을 수행한 뒤, isReady를 true로 변경하고 splashscreen을 내리는 함수
 */
const initializeApp = async (setIsReady: Dispatch<SetStateAction<boolean>>) => {
  try {
    await Promise.all([fetchEasUpdate(), loadFonts()]);
  } catch (e) {
    console.error(e);
    toast({ message: toastMessage.fontLoading.error, options: { type: "error" } });
  } finally {
    setIsReady(true);
  }
};

export default initializeApp;
