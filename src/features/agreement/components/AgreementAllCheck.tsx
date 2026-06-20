import { Checkbox } from '@/src/core/Checkbox';
import { Title } from '@/src/core/Txt';
import styled from 'styled-components/native';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const AgreementAllCheck = ({ checked, onCheckedChange }: Props) => {
  return (
    <Wrapper>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <Title color="title">전체 동의</Title>
    </Wrapper>
  );
};

export default AgreementAllCheck;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
