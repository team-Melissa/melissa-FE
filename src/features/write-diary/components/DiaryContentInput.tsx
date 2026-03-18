import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import styled from 'styled-components/native';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

const DiaryContentInput = ({ value, onValueChange }: Props) => {
  return (
    <StyledTextInput
      value={value}
      onChangeText={onValueChange}
      multiline
      textAlignVertical="top"
      placeholder="내용을 작성해주세요."
      placeholderTextColor={COLOR.placeholder}
    />
  );
};

export default DiaryContentInput;

const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: 16px 20px;
  max-height: 350px;
  background-color: ${COLOR.white};
  border-radius: 20px;
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.title};
`;
