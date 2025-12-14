import { getGetMessagesQueryKey, useGetMessages, useMessageToAiTest } from '@/src/apis/_generated/serverAPI';
import { ApiResponseChatListResponse, type ChatResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CharacterChatBubble from '../components/CharacterChatBubble';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatKeyboardAvoidingView from '../components/ChatKeyboardAvoidingView';
import ChatStartBadge from '../components/ChatStartBadge';
import UserChatBubble from '../components/UserChatBubble';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';
import { chatListFilter } from '../utils';

const setMessages = (oldData: ApiResponseChatListResponse | undefined, newData: ChatResponse) => {
  if (!oldData?.result) return oldData;

  return {
    ...oldData,
    result: {
      ...oldData.result,
      chats: [...oldData.result.chats, newData],
    },
  };
};

const ChatContainer = () => {
  const { aiProfileId, year, month, day } = useChattingQueryParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const chatListQueryKey = getGetMessagesQueryKey({ aiProfileId, year, month, day });

  const { data: chatList } = useGetMessages(
    { aiProfileId, year, month, day },
    {
      query: {
        select: chatListFilter,
      },
    }
  );

  const sendChatMutation = useMessageToAiTest({
    mutation: {
      onMutate: ({ data }) => {
        queryClient.setQueryData<ApiResponseChatListResponse>(chatListQueryKey, (oldData) =>
          setMessages(oldData, {
            chatId: -1,
            role: 'USER',
            content: data.content,
            createAt: '',
            aiProfileName: '',
            aiProfileImageS3: '',
          })
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: chatListQueryKey }),
      onError: () => {
        toast({ message: '채팅 전송에 실패했습니다.', options: { type: 'error' } });
        queryClient.invalidateQueries({ queryKey: chatListQueryKey });
      },
    },
  });

  const handleBackClick = () => {
    router.back();
  };

  const handleInputSubmit = (content: string) => {
    if (sendChatMutation.isPending) return;
    sendChatMutation.mutate({ data: { aiProfileId, year, month, day, content } });
  };

  const handleVoiceModeClick = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  if (!chatList) return null;

  return (
    <SafeView>
      <ChatHeader characterId={aiProfileId} onBackClick={handleBackClick} />
      <ChatKeyboardAvoidingView>
        <StyledScrollView contentContainerStyle={{ rowGap: 15 }}>
          <ChatStartBadge characterId={aiProfileId} year={year % 100} month={month} day={day} />
          {chatList.map((chat) => {
            if (chat.role === 'AI') {
              return <CharacterChatBubble key={chat.chatId} characterId={aiProfileId} chat={chat} />;
            }
            return <UserChatBubble key={chat.chatId} chat={chat} />;
          })}
        </StyledScrollView>
        <ChatInput onInputSubmit={handleInputSubmit} onVoiceModeClick={handleVoiceModeClick} />
      </ChatKeyboardAvoidingView>
    </SafeView>
  );
};

export default ChatContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
  margin-bottom: 10px;
`;
