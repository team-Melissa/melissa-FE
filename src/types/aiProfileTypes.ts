import { SuccessResponse } from "@/src/types/commonTypes";

export type AiProfileMakeAnswers = {
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

export type AiProfileMakeResult = SuccessResponse & {
  result: AiProfile;
};

export type AiProfileListResult = SuccessResponse & {
  result: AiProfile[];
};

export type GetMakeAssistantQuestionResult = SuccessResponse & {
  result: AiProfileMakeAnswers & {
    createdAt: string;
  };
};
