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
import { Alert, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatScrollView from '../components/ChatScrollView';
import GenerateDiaryButton from '../components/GenerateDiaryButton';
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ChatScrollView chatData={chatList} characterId={aiProfileId} year={year} month={month} day={day} />
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
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default ChatContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
