import { getIsChatTutorialOpen, getIsDiaryTutorialOpen, getIsMainTutorialOpen } from "./mmkv";

export const canShowDiaryTutorial = () => {
  const isMainTutorialOpen = getIsMainTutorialOpen();
  const isChatTutorialOpen = getIsChatTutorialOpen();

  if (isMainTutorialOpen || isChatTutorialOpen) return false;
  return getIsDiaryTutorialOpen();
};
