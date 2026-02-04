import { LargeTitle } from '@/src/core/Txt';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';
import MenuButtons from './MenuButtons';
import StreakBadge from './StreakBadge';

type Props = {
  children?: ReactNode;
};

const HomeHeader = ({ children }: Props) => {
  return (
    <Wrapper>
      <StreakBadge />
      <LargeTitle color="title">{children}</LargeTitle>
      <MenuButtons />
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.View`
  width: 100%;
  padding-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
