import {
  getGetCalendarViewQueryKey,
  getGetCurrentStreakQueryKey,
  getGetFeedQueryKey,
  useCreateManualDiary,
} from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
import { AdsBanner } from '@/src/modules/ads';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import DiaryContentInput from '../components/DiaryContentInput';
import DiaryTitleInput from '../components/DiaryTitleInput';
import WriteDiaryHeader from '../components/WriteDiaryHeader';
import { useWriteDiaryQueryParams } from '../hooks/useWriteDiaryQueryParams';

const WriteDiaryContainer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { year, month, day } = useWriteDiaryQueryParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const createManualDiaryMutation = useCreateManualDiary();

  const isFormValid = title.trim() && content.trim();

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmitClick = () => {
    if (!isFormValid || createManualDiaryMutation.isPending) return;
    createManualDiaryMutation.mutate(
      {
        data: { aiProfileId: 1, year, month, day, title, content },
      },
      {
        onSuccess: () => {
          toast({ message: '저장되었습니다.', options: { type: 'success' } });
          queryClient.invalidateQueries({ queryKey: getGetCalendarViewQueryKey({ year, month }) });
          queryClient.invalidateQueries({ queryKey: getGetFeedQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetCurrentStreakQueryKey() });
          router.dismissAll();
        },
        onError: () => {
          toast({ message: '저장에 실패했습니다. 잠시 후 다시 시도해주세요.', options: { type: 'error' } });
        },
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeView>
        <WriteDiaryHeader onBackClick={handleBackClick}>{`${year}년 ${month}월 ${day}일`}</WriteDiaryHeader>
        <ContentWrapper>
          <DiaryTitleInput value={title} onValueChange={setTitle} />
          <DiaryContentInput value={content} onValueChange={setContent} />
        </ContentWrapper>
        <AdsBanner unitId="" style={{ alignItems: 'center' }} />
        <ButtonWrapper>
          <PrimaryButton
            size="large"
            disabled={!isFormValid || createManualDiaryMutation.isPending}
            onPress={handleSubmitClick}
          >
            {createManualDiaryMutation.isPending ? '일기 저장중...' : '일기 저장하기'}
          </PrimaryButton>
        </ButtonWrapper>
      </SafeView>
    </TouchableWithoutFeedback>
  );
};

export default WriteDiaryContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
  gap: 24px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  gap: 12px;
`;

const ButtonWrapper = styled.View`
  margin: 0 auto;
  padding-bottom: 20px;
`;
