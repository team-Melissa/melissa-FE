import type { ApiResponseChatListResponse } from '@/src/apis/_generated/serverAPI.schemas';

export const setOptimisticUserMessage = (oldData: ApiResponseChatListResponse | undefined, input: string) => {
  if (!oldData?.result) return oldData;

  const userMessage = {
    chatId: -1,
    role: 'USER',
    content: input,
    createAt: '',
    aiProfileName: '',
    aiProfileImageS3: '',
  } as const;

  return {
    ...oldData,
    result: {
      ...oldData.result,
      chats: [...oldData.result.chats, userMessage],
    },
  };
};
