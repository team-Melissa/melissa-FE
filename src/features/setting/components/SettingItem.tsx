import { COLOR } from '@/src/constants/theme';
import { Description2, Title } from '@/src/core/Txt';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const SettingItem = ({ title, description, children }: Props) => {
  return (
    <Wrapper>
      <TextWrapper>
        <Title color="title">{title}</Title>
        <Description2 color="sub1">{description}</Description2>
      </TextWrapper>
      {children}
    </Wrapper>
  );
};

export default SettingItem;

const Wrapper = styled.View`
  width: 100%;
  height: 92px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.white};
  padding: 18px;
  border-radius: 20px;
`;

const TextWrapper = styled.View`
  gap: 3px;
`;
