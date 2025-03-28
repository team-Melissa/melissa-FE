import { SuccessDTO } from "@/src/types/commonTypes";

export type TChat = {
  role: "AI" | "USER";
  chatId: number;
  content: string;
  createAt: string;
  aiProfileName: string;
  aiProfileImageS3: string;
};

export type NewThreadDTO = SuccessDTO & {
  result: {
    threadId: number;
    year: number;
    month: number;
    day: number;
  };
};

export type MessagesDTO = SuccessDTO & {
  result: {
    aiProfileName: string;
    aiProfileImageS3: string;
    chats: TChat[];
  };
};

export type FluxEventDTO = "aiMessage" | "finish";

export type TThreadDate = {
  year: number;
  month: number;
  day: number;
};

export type TThreadDateSearchParams = {
  year?: number;
  month?: number;
  day?: number;
};
