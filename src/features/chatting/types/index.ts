import type { ChatResponseRole } from '@/src/apis/_generated/serverAPI.schemas';

export type ChatData = {
  chatId: number;
  content: string;
  createAt: string;
  role: ChatResponseRole;
};
