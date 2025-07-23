import type { SuccessDTO } from "@/src/types/commonTypes";

export type TAiProfile = {
  aiProfileId: number;
  profileName: string;
  imageUrl: string | null;
  hashTag1: string;
  hashTag2: string;
  feature1: string;
  feature2: string;
  feature3: string;
  createdAt: string;
  default: boolean;
};

export type AiProfileListDTO = SuccessDTO & {
  result: TAiProfile[];
};
