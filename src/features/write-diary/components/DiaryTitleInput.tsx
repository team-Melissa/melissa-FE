import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import styled from 'styled-components/native';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

const DiaryTitleInput = ({ value, onValueChange }: Props) => {
  return (
    <StyledTextInput
      value={value}
      onChangeText={onValueChange}
      placeholder="제목을 작성해주세요."
      placeholderTextColor={COLOR.placeholder}
      maxLength={50}
    />
  );
};

export default DiaryTitleInput;

const StyledTextInput = styled.TextInput`
  padding: 16px 20px;
  background-color: ${COLOR.white};
  border-radius: 20px;
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.title};
`;
