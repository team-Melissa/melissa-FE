import { SuccessDTO } from "@/src/types/commonTypes";

export type NewThreadResult = SuccessDTO & {
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

export type ThreadDateSearchParams = {
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
};

export type Chat = {
  role: "AI" | "USER";
  chatId: number;
  content: string;
  createAt: string;
  aiProfileName: string;
  aiProfileImageS3: string;
};

export type MessageResult = SuccessDTO & {
  result: {
    aiProfileName: string;
    aiProfileImageS3: string;
    chats: Chat[];
  };
};

export type ExpiredDate = Date;

export type FluxEvent = "aiMessage" | "finish";
