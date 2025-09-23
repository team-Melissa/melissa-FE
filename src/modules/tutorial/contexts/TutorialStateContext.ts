import { createContext } from "react";

type StateContext = {
  showMainTutorial: boolean;
  showChatTutorial: boolean;
  showDiaryTutorial: boolean;
};

export const TutorialStateContext = createContext<StateContext | null>(null);
