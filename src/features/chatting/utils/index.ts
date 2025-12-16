import type { ApiResponseChatListResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { isNonNullableChatResponse } from './typeGuard';

export const chatListFilter = (data: ApiResponseChatListResponse) => {
  return data?.result?.chats
    .filter(isNonNullableChatResponse)
    .map(({ chatId, content, createAt, role }) => ({ chatId, content, createAt, role }));
};
