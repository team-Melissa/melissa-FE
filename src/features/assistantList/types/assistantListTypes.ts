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

export type TNewAiTrigger = { isGenerateButton: boolean };

export type AssistantProfileListDTO = SuccessDTO & {
  result: TAssistantProfile[];
};
