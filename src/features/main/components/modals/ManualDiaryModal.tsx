import styled from 'styled-components/native';
import type { DateData } from 'react-native-calendars';
import { ModalRoot, type ModalProps } from '@/src/modules/modal';
import responsiveToPx, { responsiveToPxByHeight } from '@/src/utils/responsiveToPx';
import { theme } from '@/src/constants/theme';
import { useState } from 'react';
import { useManualDiaryMutation } from '../../hooks/mutations/useManualDiaryMutation';
import { Keyboard } from 'react-native';

type Props = ModalProps & {
  date: DateData;
};

const ManualDiaryModal = ({ isOpen, close, exit, date }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [hashtag1, setHashtag1] = useState<string>('');
  const [hashtag2, setHashtag2] = useState<string>('');
  const isSubmitable = !!title && !!content && !!hashtag1 && !!hashtag2;

  const manualDiaryMutation = useManualDiaryMutation();

  const handleSubmitSuccess = () => {
    Keyboard.dismiss();
    exit();
  };

  const handleSubmitPress = () => {
    if (manualDiaryMutation.isPending) return;

    const diary = { title, content, hashtag1, hashtag2 };
    manualDiaryMutation.mutate({ date, diary }, { onSuccess: handleSubmitSuccess });
  };

  return (
    <ModalRoot isOpen={isOpen} onClose={close}>
      <Wrapper>
        <Title>일기 작성</Title>
        <TitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 작성해주세요..."
          hitSlop={15}
          placeholderTextColor={theme.colors.placeholderText}
        />
        <ContentInput
          value={content}
          onChangeText={setContent}
          placeholder="일기를 작성해주세요..."
          hitSlop={15}
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.placeholderText}
        />
        <HashtagInputWrapper>
          <HashtagInput
            value={hashtag1}
            onChangeText={setHashtag1}
            placeholder="#여행"
            hitSlop={15}
            placeholderTextColor={theme.colors.placeholderText}
          />
          <HashtagInput
            value={hashtag2}
            onChangeText={setHashtag2}
            placeholder="#행복"
            hitSlop={15}
            placeholderTextColor={theme.colors.placeholderText}
          />
        </HashtagInputWrapper>
        <SubmitButton disabled={!isSubmitable} onPress={handleSubmitPress}>
          <SubmitButtonText>저장하기</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </ModalRoot>
  );
};

export default ManualDiaryModal;

const Wrapper = styled.View`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: ${responsiveToPx('30px')};
  gap: ${theme.gap.lg};
  border-radius: ${theme.borderRadius.lg};
`;

const Title = styled.Text`
  font-family: ${theme.fontFamily.nsExtraBold};
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
`;

const TitleInput = styled.TextInput`
  width: 100%;
  height: ${responsiveToPx('45px')};
  padding: ${responsiveToPx('11px')};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nsRegular};
  font-size: ${theme.fontSize.base};
`;

const ContentInput = styled.TextInput`
  width: 100%;
  height: ${responsiveToPxByHeight('120px')};
  padding: ${responsiveToPx('11px')};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nsRegular};
  font-size: ${theme.fontSize.base};
`;

const HashtagInputWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${theme.gap.lg};
`;

const HashtagInput = styled.TextInput`
  flex: 1;
  height: ${responsiveToPx('45px')};
  padding: ${responsiveToPx('11px')};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nsRegular};
  font-size: ${theme.fontSize.base};
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: ${responsiveToPx('45px')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? theme.colors.gray : theme.colors.deepGreen)};
  border-radius: ${theme.borderRadius.sm};
`;

const SubmitButtonText = styled.Text`
  font-family: ${theme.fontFamily.nsBold};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.white};
`;
