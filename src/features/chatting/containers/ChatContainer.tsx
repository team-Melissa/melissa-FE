import {
  getGetCalendarViewQueryKey,
  getGetCurrentStreakQueryKey,
  getGetFeedQueryKey,
  getGetMessagesQueryKey,
  useCreateChatDiary,
  useGetMessages,
  useMessageToAiTest,
} from '@/src/apis/_generated/serverAPI';
import { ApiResponseChatListResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import { useIsKeyboardOpen } from '@/src/hooks/useIsKeyboardOpen';
import { toast } from '@/src/modules/toast';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ChatHeader from '../components/ChatHeader';
import ChatScrollView from '../components/ChatScrollView';
import ChatSendButton from '../components/ChatSendButton';
import GenerateDiaryButton from '../components/GenerateDiaryButton';
import { useCanGenerateDiary } from '../hooks/useCanGenerateDiary';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';
import { chatListFilter } from '../utils';
import { setOptimisticUserMessage } from '../utils/optimisticUpdate';

const ChatContainer = () => {
  const [input, setInput] = useState<string>('');
  const { aiProfileId, year, month, day } = useChattingQueryParams();
  const isKeyboardOpen = useIsKeyboardOpen();
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
        queryClient.invalidateQueries({ queryKey: getGetFeedQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetCurrentStreakQueryKey() });
      },
      onSuccess: () => {
        toast({ message: '일기가 생성되었습니다.', options: { type: 'success' } });
        router.dismissAll();
      },
      onError: (e) => {
        if (e.response?.status === 429) {
          return toast({ message: '사용 한도를 초과했습니다.', options: { type: 'error' } });
        }
        if (e.response?.data.code === 'DIARY4004') {
          return toast({ message: '일기는 하루 3개까지 작성 가능합니다.', options: { type: 'error' } });
        }
        toast({ message: '일기 생성에 실패했습니다.', options: { type: 'error' } });
      },
    },
  });

  const handleBackClick = () => {
    router.back();
  };

  const handleInputSubmit = () => {
    if (sendChatMutation.isPending) return;
    const content = input.trim();
    if (!content) return;
    sendChatMutation.mutate({ data: { aiProfileId, year, month, day, content } });
    setInput('');
  };

  const handleDiarySummaryClick = () => {
    if (!canGenerateDiary) {
      return toast({ message: '대화를 조금 더 나눈 뒤, 다시 시도해주세요', options: { type: 'error' } });
    }
    if (generateDiaryMutation.isPending) return;
    generateDiaryMutation.mutate({ data: { aiProfileId, year, month, day } });
  };

  if (!chatList) return null;

  return (
    <SafeView>
      <ChatHeader characterId={aiProfileId} onBackClick={handleBackClick} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ChatScrollView chatData={chatList} characterId={aiProfileId} year={year} month={month} day={day} />
        <InputBarWrapper>
          <StyledInput
            value={input}
            onChangeText={setInput}
            multiline
            placeholder="오늘 하루에 대해 말해주세요."
            placeholderTextColor={COLOR.placeholder}
          />
          {!!input ? (
            <ChatSendButton isLoading={sendChatMutation.isPending} onClick={handleInputSubmit} />
          ) : (
            <GenerateDiaryButton
              isLoading={generateDiaryMutation.isPending}
              isExpanded={!isKeyboardOpen}
              onClick={handleDiarySummaryClick}
            />
          )}
        </InputBarWrapper>
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

const InputBarWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${responsiveToPx('72px')};
  align-items: center;
  gap: 8px;
  padding: 10px 0;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  border-radius: 99px;
  padding: 15px;
  background-color: ${COLOR.white};
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 15px;
  color: ${COLOR.title};
`;
