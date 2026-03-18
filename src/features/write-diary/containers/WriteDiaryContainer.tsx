import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
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
  const { year, month, day } = useWriteDiaryQueryParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const isFormValid = title.trim() && content.trim();

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: API 연결
    console.log({ title, content, year, month, day });
  };

  return (
    <SafeView>
      <WriteDiaryHeader onBackClick={handleBackClick}>{`${year}년 ${month}월 ${day}일`}</WriteDiaryHeader>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContentWrapper>
          <DiaryTitleInput value={title} onValueChange={setTitle} />
          <DiaryContentInput value={content} onValueChange={setContent} />
        </ContentWrapper>
      </TouchableWithoutFeedback>
      <ButtonWrapper>
        <PrimaryButton size="large" disabled={!isFormValid} onPress={handleSubmit}>
          일기 저장하기
        </PrimaryButton>
      </ButtonWrapper>
    </SafeView>
  );
};

export default WriteDiaryContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  gap: 12px;
`;

const ButtonWrapper = styled.View`
  margin: 0 auto;
  padding-bottom: 20px;
`;
