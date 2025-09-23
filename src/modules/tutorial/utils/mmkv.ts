import { MMKV } from "react-native-mmkv";
import { CHAT_TUTORIAL_KEY, DIARY_TUTORIAL_KEY, MAIN_TUTORIAL_KEY, TUTORIAL_MMKV_ID } from "../constants";

const storage = new MMKV({ id: TUTORIAL_MMKV_ID });

export const isMainTutorialDone = () => {
  return storage.getBoolean(MAIN_TUTORIAL_KEY);
};

export const completeMainTutorial = () => {
  return storage.set(MAIN_TUTORIAL_KEY, true);
};

export const isChatTutorialDone = () => {
  return storage.getBoolean(CHAT_TUTORIAL_KEY);
};

export const completeChatTutorial = () => {
  return storage.set(CHAT_TUTORIAL_KEY, true);
};

export const isDiaryTutorialDone = () => {
  return storage.getBoolean(DIARY_TUTORIAL_KEY);
};

export const completeDiaryTutorial = () => {
  return storage.set(DIARY_TUTORIAL_KEY, true);
};
