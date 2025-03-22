import { SuccessDTO } from "@/src/types/commonTypes";

export type TMakeAssistantAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

export type AiProfile = {
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

export type AiProfileListWithGenerateAiTrigger = AiProfile | { isGenerateButton: boolean };

export type MakeAssistantDTO = SuccessDTO & {
  result: AiProfile;
};

export type AiProfileListResult = SuccessDTO & {
  result: AiProfile[];
};

export type GetMakeAssistantQuestionResult = SuccessDTO & {
  result: TMakeAssistantAnswers & {
    createdAt: string;
  };
};
