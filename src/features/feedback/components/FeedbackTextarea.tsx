import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import { Body2 } from '@/src/core/Txt';
import { useState } from 'react';
import styled from 'styled-components/native';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

const FeedbackTextarea = ({ value, onValueChange }: Props) => {
  const [errorText, setErrorText] = useState<string>('');

  const handleInputFocus = () => {
    setErrorText('');
  };

  const handleInputBlur = () => {
    if (!value.trim()) {
      setErrorText('의견을 입력해주세요.');
    }
  };

  return (
    <Wrapper>
      <StyledTextInput
        value={value}
        onChangeText={onValueChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        multiline
        textAlignVertical="top"
        placeholder="의견을 입력해주세요"
        placeholderTextColor={COLOR.placeholder}
        $hasError={!!errorText}
      />
      {!!errorText && <Body2 color="error">{errorText}</Body2>}
    </Wrapper>
  );
};

export default FeedbackTextarea;

const Wrapper = styled.View`
  gap: 6px;
`;

const StyledTextInput = styled.TextInput<{ $hasError: boolean }>`
  min-height: 160px;
  padding: 16px 20px;
  background-color: ${COLOR.white};
  border-radius: 12px;
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.title};
  border-width: 1px;
  border-color: ${({ $hasError }) => ($hasError ? COLOR.error : 'transparent')};
`;
