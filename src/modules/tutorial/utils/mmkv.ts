import { MMKV } from "react-native-mmkv";
import { CHAT_TUTORIAL_KEY, DIARY_TUTORIAL_KEY, MAIN_TUTORIAL_KEY, TUTORIAL_MMKV_ID } from "../constants";

const storage = new MMKV({ id: TUTORIAL_MMKV_ID });

export const getIsMainTutorialOpen = () => {
  return storage.getBoolean(MAIN_TUTORIAL_KEY) ?? true;
};

export const getIsChatTutorialOpen = () => {
  return storage.getBoolean(CHAT_TUTORIAL_KEY) ?? true;
};

export const getIsDiaryTutorialOpen = () => {
  const isMainTutorialOpen = getIsMainTutorialOpen();
  const isChatTutorialOpen = getIsChatTutorialOpen();

  if (isMainTutorialOpen || isChatTutorialOpen) return false;
  return storage.getBoolean(DIARY_TUTORIAL_KEY) ?? true;
};

export const completeMainTutorial = () => {
  return storage.set(MAIN_TUTORIAL_KEY, false);
};

export const completeChatTutorial = () => {
  return storage.set(CHAT_TUTORIAL_KEY, false);
};

export const completeDiaryTutorial = () => {
  return storage.set(DIARY_TUTORIAL_KEY, false);
};
