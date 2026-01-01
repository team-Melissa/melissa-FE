import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import { Body2 } from '@/src/core/Txt';
import { useState } from 'react';
import styled from 'styled-components/native';
import { isValidEmail } from '../utils/validation';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

const EmailInput = ({ value, onValueChange }: Props) => {
  const [errorText, setErrorText] = useState<string>('');
  const [isFirstFocus, setIsFirstFocus] = useState<boolean>(true);

  const handleInputFocus = () => {
    setErrorText('');
    if (isFirstFocus) {
      setIsFirstFocus(false);
      onValueChange('');
    }
  };

  const handleInputBlur = () => {
    if (!value.trim()) {
      setErrorText('이메일을 입력해주세요.');
      return;
    }
    if (!isValidEmail(value)) {
      setErrorText('이메일 형식을 확인해주세요.');
    }
  };

  return (
    <Wrapper>
      <StyledTextInput
        value={value}
        onChangeText={onValueChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="example@email.com"
        placeholderTextColor={COLOR.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        $hasError={!!errorText}
      />
      {!!errorText && <Body2 color="error">{errorText}</Body2>}
    </Wrapper>
  );
};

export default EmailInput;

const Wrapper = styled.View`
  gap: 6px;
`;

const StyledTextInput = styled.TextInput<{ $hasError: boolean }>`
  height: 52px;
  padding: 16px 20px;
  background-color: ${COLOR.white};
  border-radius: 12px;
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.title};
  border-width: 1px;
  border-color: ${({ $hasError }) => ($hasError ? COLOR.error : 'transparent')};
`;
