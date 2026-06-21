import { COLOR } from '@/src/constants/theme';
import { IconCheck } from '@/src/icons';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export const Checkbox = ({ checked, onCheckedChange }: Props) => {
  const handleCheckboxPress = () => {
    onCheckedChange(!checked);
  };

  return (
    <Pressable onPress={handleCheckboxPress} hitSlop={15}>
      <Circle checked={checked}>{checked && <IconCheck />}</Circle>
    </Pressable>
  );
};

const Circle = styled.View<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ checked }) => (checked ? COLOR.main : COLOR.white)};
  border-width: ${({ checked }) => (checked ? '0px' : '1.5px')};
  border-color: ${COLOR.placeholder};
`;
