import { useEffect, useState } from 'react';
import type { ChatData } from '../types';

export const useCanGenerateDiary = (chatList: ChatData[]) => {
  const [canGenerateDiary, setCanGenerateDiary] = useState<boolean>(false);

  useEffect(() => {
    const userChatList = chatList.filter(({ role }) => role === 'USER');
    setCanGenerateDiary(userChatList.length >= 3);
  }, [chatList]);

  return canGenerateDiary;
};
