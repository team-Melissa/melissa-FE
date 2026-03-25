import {
  getGetCalendarViewQueryKey,
  getGetCurrentStreakQueryKey,
  getGetFeedQueryKey,
  useGetDailySummary,
  useUpdateDiary,
} from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import DiaryContentInput from '../components/DiaryContentInput';
import DiaryHashtagInput from '../components/DiaryHashtagInput';
import DiaryTitleInput from '../components/DiaryTitleInput';
import WriteDiaryHeader from '../components/WriteDiaryHeader';
import { useEditDiaryQueryParams } from '../hooks/useEditDiaryQueryParams';

const EditDiaryContainer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { diaryId, year, month, day } = useEditDiaryQueryParams();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [hashtag1, setHashtag1] = useState<string>('');
  const [hashtag2, setHashtag2] = useState<string>('');

  const { data, isLoading } = useGetDailySummary({ year, month, day });

  const diary = data?.result?.diaries?.find((d) => d.diaryId === diaryId);

  useEffect(() => {
    if (diary) {
      setTitle(diary.title ?? '');
      setContent(diary.content ?? '');
      setHashtag1(diary.hashtag1 ?? '');
      setHashtag2(diary.hashtag2 ?? '');
    }
  }, [diary]);

  const isFormValid = title.trim() && content.trim() && hashtag1.trim() && hashtag2.trim();

  const updateDiaryMutation = useUpdateDiary({
    mutation: {
      onError: () => {
        toast({ message: '수정에 실패했습니다. 잠시 후 다시 시도해주세요.', options: { type: 'error' } });
      },
      onSuccess: () => {
        toast({ message: '수정되었습니다.', options: { type: 'success' } });
        queryClient.invalidateQueries({ queryKey: getGetCalendarViewQueryKey({ year, month }) });
        queryClient.invalidateQueries({ queryKey: getGetFeedQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetCurrentStreakQueryKey() });
        router.dismissAll();
      },
    },
  });

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!isFormValid || updateDiaryMutation.isPending) return;
    updateDiaryMutation.mutate({
      diaryId,
      data: {
        title,
        content,
        hashtag1: hashtag1 || null,
        hashtag2: hashtag2 || null,
      },
    });
  };

  if (isLoading) {
    return (
      <SafeView>
        <LoadingWrapper>
          <ActivityIndicator size="large" color={COLOR.main} />
        </LoadingWrapper>
      </SafeView>
    );
  }

  return (
    <SafeView>
      <WriteDiaryHeader onBackClick={handleBackClick}>{`${year}년 ${month}월 ${day}일`}</WriteDiaryHeader>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContentWrapper>
          <DiaryTitleInput value={title} onValueChange={setTitle} />
          <DiaryContentInput value={content} onValueChange={setContent} />
          <HashtagWrapper>
            <DiaryHashtagInput value={hashtag1} onValueChange={setHashtag1} placeholder="#태그1" />
            <DiaryHashtagInput value={hashtag2} onValueChange={setHashtag2} placeholder="#태그2" />
          </HashtagWrapper>
        </ContentWrapper>
      </TouchableWithoutFeedback>
      <ButtonWrapper>
        <PrimaryButton size="large" disabled={!isFormValid} onPress={handleSubmit}>
          수정 완료
        </PrimaryButton>
      </ButtonWrapper>
    </SafeView>
  );
};

export default EditDiaryContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.View`
  flex: 1;
  gap: 12px;
`;

const HashtagWrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ButtonWrapper = styled.View`
  margin: 0 auto;
  padding-bottom: 20px;
`;
