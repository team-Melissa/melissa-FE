import { SuccessResponse } from "@/src/types/commonTypes";

export type NewThreadResult = SuccessResponse & {
  result: {
    threadId: number;
    year: number;
    month: number;
    day: number;
  };
};

export type ThreadDate = {
  year: number;
  month: number;
  day: number;
};

export type Chat = {
  role: "AI" | "USER";
  chatId: number;
  content: string;
  createAt: string;
  aiProfileName: string;
  aiProfileImageS3: string;
};

export type MessageResult = SuccessResponse & {
  result: {
    aiProfileName: string;
    aiProfileImageS3: string;
    chats: Chat[];
  };
};

export type ExpiredDate = Date;

export type FluxEvent = "aiMessage" | "finish";
