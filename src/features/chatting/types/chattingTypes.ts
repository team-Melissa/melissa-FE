import { SuccessDTO } from "@/src/types/commonTypes";

// Todo: placeholder 이미지로 변경되면, 타입 정리 필요
export type TChat = {
  role: "AI" | "USER";
  chatId: number;
  content: string;
  createAt: string;
  aiProfileName: string;
  aiProfileImageS3: string | null;
};

export type NewThreadDTO = SuccessDTO & {
  result: {
    threadId: number;
    year: number;
    month: number;
    day: number;
  };
};

// Todo: placeholder 이미지로 변경되면, 타입 정리 필요
export type MessagesDTO = SuccessDTO & {
  result: {
    aiProfileName: string;
    aiProfileImageS3: string | null;
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
