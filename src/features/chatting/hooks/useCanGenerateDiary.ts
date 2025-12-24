import { useEffect, useState } from 'react';
import type { ChatData } from '../types';

export const useCanGenerateDiary = (chatList: ChatData[]) => {
  const [canGenerateDiary, setCanGenerateDiary] = useState<boolean>(false);

  useEffect(() => {
    const characterChatList = chatList.filter(({ role }) => role === 'AI');
    setCanGenerateDiary(characterChatList.length >= 4);
  }, [chatList]);

  return canGenerateDiary;
};
