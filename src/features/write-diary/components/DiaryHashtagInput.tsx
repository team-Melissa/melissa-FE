import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import styled from 'styled-components/native';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

const MAX_LENGTH = 5;

const DiaryHashtagInput = ({ value, onValueChange, placeholder }: Props) => {
  const handleChangeText = (text: string) => {
    if (text.length > MAX_LENGTH) return;
    onValueChange(text);
  };

  return (
    <StyledTextInput
      testID="diary-hashtag-input"
      value={value}
      onChangeText={handleChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLOR.placeholder}
      maxLength={MAX_LENGTH}
    />
  );
};

export default DiaryHashtagInput;

const StyledTextInput = styled.TextInput`
  padding: 12px 16px;
  background-color: ${COLOR.white};
  border-radius: 12px;
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.title};
`;
