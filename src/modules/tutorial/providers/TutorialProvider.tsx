import { useCallback, useState, type PropsWithChildren } from "react";
import {
  completeChatTutorial,
  completeDiaryTutorial,
  completeMainTutorial,
  getIsChatTutorialOpen,
  getIsDiaryTutorialOpen,
  getIsMainTutorialOpen,
} from "../utils/mmkv";
import { TutorialDispatchContext } from "../contexts/TutorialDispatchContext";
import { TutorialStateContext } from "../contexts/TutorialStateContext";

export const TutorialProvider = ({ children }: PropsWithChildren) => {
  const [showMainTutorial, setShowMainTutorial] = useState<boolean>(getIsMainTutorialOpen());
  const [showChatTutorial, setShowChatTutorial] = useState<boolean>(getIsChatTutorialOpen());
  const [showDiaryTutorial, setShowDiaryTutorial] = useState<boolean>(getIsDiaryTutorialOpen());

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

  const stateValue = { showMainTutorial, showChatTutorial, showDiaryTutorial };
  const dispatchValue = { handleCompleteMainTutorial, handleCompleteChatTutorial, handleCompleteDiaryTutorial };

  return (
    <TutorialDispatchContext.Provider value={dispatchValue}>
      <TutorialStateContext.Provider value={stateValue}>{children}</TutorialStateContext.Provider>
    </TutorialDispatchContext.Provider>
  );
};
