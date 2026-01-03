import {
  getGetCalendarViewQueryKey,
  getGetMessagesQueryKey,
  useCreateChatDiary,
  useGetMessages,
  useMessageToAiTest,
} from '@/src/apis/_generated/serverAPI';
import { ApiResponseChatListResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CharacterChatBubble from '../components/CharacterChatBubble';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatKeyboardAvoidingView from '../components/ChatKeyboardAvoidingView';
import ChatStartBadge from '../components/ChatStartBadge';
import GenerateDiaryButton from '../components/GenerateDiaryButton';
import UserChatBubble from '../components/UserChatBubble';
import { useCanGenerateDiary } from '../hooks/useCanGenerateDiary';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';
import { chatListFilter } from '../utils';
import { setOptimisticUserMessage } from '../utils/optimisticUpdate';

const ChatContainer = () => {
  const { aiProfileId, year, month, day } = useChattingQueryParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: chatList } = useGetMessages(
    { aiProfileId, year, month, day },
    {
      query: {
        select: chatListFilter,
      },
    }
  );

  const canGenerateDiary = useCanGenerateDiary(chatList ?? []);

  const sendChatMutation = useMessageToAiTest({
    mutation: {
      onMutate: ({ data }) => {
        queryClient.setQueryData<ApiResponseChatListResponse>(
          getGetMessagesQueryKey({ aiProfileId, year, month, day }),
          (oldData) => setOptimisticUserMessage(oldData, data.content)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: getGetMessagesQueryKey({ aiProfileId, year, month, day }) });
      },
      onError: (e) => {
        if (e.response?.status === 429) {
          return toast({ message: '사용 한도를 초과했습니다.', options: { type: 'error' } });
        }
        toast({ message: '채팅 전송에 실패했습니다.', options: { type: 'error' } });
      },
    },
  });

  const generateDiaryMutation = useCreateChatDiary({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: getGetCalendarViewQueryKey({ year, month }) });
      },
      onSuccess: () => {
        toast({ message: '일기가 생성되었습니다.', options: { type: 'success' } });
        router.dismissAll();
      },
      onError: (e) => {
        if (e.response?.status === 429) {
          return toast({ message: '사용 한도를 초과했습니다.', options: { type: 'error' } });
        }
        toast({ message: '일기 생성에 실패했습니다.', options: { type: 'error' } });
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

  const handleDiarySummaryClick = () => {
    if (generateDiaryMutation.isPending) return;
    generateDiaryMutation.mutate({ data: { aiProfileId, year, month, day } });
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
        <View>
          <GenerateDiaryButton
            isVisible={canGenerateDiary}
            isLoading={generateDiaryMutation.isPending}
            disabled={generateDiaryMutation.isPending}
            onClick={handleDiarySummaryClick}
          />
          <ChatInput
            inputDisabled={sendChatMutation.isPending}
            onInputSubmit={handleInputSubmit}
            onVoiceModeClick={handleVoiceModeClick}
          />
        </View>
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
`;
