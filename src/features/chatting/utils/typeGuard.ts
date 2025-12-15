import { type ChatResponse } from '@/src/apis/_generated/serverAPI.schemas';

export const isNonNullableChatResponse = (value: ChatResponse): value is NonNullable<ChatResponse> => {
  return !!value?.chatId && !!value?.content && !!value?.createAt && !!value?.role;
};
