import type { SuccessDTO } from "@/src/types/commonTypes";

export type TAssistantProfile = {
  aiProfileId: number;
  profileName: string;
  imageUrl: string;
  hashTag1: string;
  hashTag2: string;
  feature1: string;
  feature2: string;
  feature3: string;
  createdAt: string;
};

export type TAssistantMakeQnA = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

export type TNewAiTrigger = { isGenerateButton: boolean };

export type AssistantProfileListDTO = SuccessDTO & {
  result: TAssistantProfile[];
};

export type MakeAssistantQuestionResult = SuccessDTO & {
  result: TAssistantMakeQnA & {
    createdAt: string;
  };
};
