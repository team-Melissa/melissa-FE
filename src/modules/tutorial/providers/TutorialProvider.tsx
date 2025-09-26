import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import {
  completeChatTutorial,
  completeDiaryTutorial,
  completeMainTutorial,
  getIsChatTutorialOpen,
  getIsMainTutorialOpen,
} from "../utils/mmkv";
import { TutorialDispatchContext } from "../contexts/TutorialDispatchContext";
import { TutorialStateContext } from "../contexts/TutorialStateContext";
import { canShowDiaryTutorial } from "../utils/canShowDiaryTutorial";

export const TutorialProvider = ({ children }: PropsWithChildren) => {
  const [showMainTutorial, setShowMainTutorial] = useState<boolean>(getIsMainTutorialOpen());
  const [showChatTutorial, setShowChatTutorial] = useState<boolean>(getIsChatTutorialOpen());
  const [showDiaryTutorial, setShowDiaryTutorial] = useState<boolean>(canShowDiaryTutorial());

  const handleCompleteMainTutorial = useCallback(() => {
    setShowMainTutorial(false);
    completeMainTutorial();
  }, []);

  const handleCompleteChatTutorial = useCallback(() => {
    setShowChatTutorial(false);
    completeChatTutorial();
  }, []);

  const handleCompleteDiaryTutorial = useCallback(() => {
    setShowDiaryTutorial(false);
    completeDiaryTutorial();
  }, []);

  useEffect(() => {
    if (!showMainTutorial && !showChatTutorial) {
      setShowDiaryTutorial(canShowDiaryTutorial());
    }
  }, [showChatTutorial, showMainTutorial]);

  const stateValue = { showMainTutorial, showChatTutorial, showDiaryTutorial };
  const dispatchValue = { handleCompleteMainTutorial, handleCompleteChatTutorial, handleCompleteDiaryTutorial };

  return (
    <TutorialDispatchContext.Provider value={dispatchValue}>
      <TutorialStateContext.Provider value={stateValue}>{children}</TutorialStateContext.Provider>
    </TutorialDispatchContext.Provider>
  );
};
