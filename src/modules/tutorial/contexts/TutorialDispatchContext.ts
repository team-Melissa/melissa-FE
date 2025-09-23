import { createContext } from "react";

type DispatchContext = {
  handleCompleteMainTutorial: () => void;
  handleCompleteChatTutorial: () => void;
  handleCompleteDiaryTutorial: () => void;
};

export const TutorialDispatchContext = createContext<DispatchContext | null>(null);
