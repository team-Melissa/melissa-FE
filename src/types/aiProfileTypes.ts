import { SuccessDTO } from "@/src/types/commonTypes";

export type AiProfileMakeAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

export type GetMakeAssistantQuestionResult = SuccessDTO & {
  result: AiProfileMakeAnswers & {
    createdAt: string;
  };
};
