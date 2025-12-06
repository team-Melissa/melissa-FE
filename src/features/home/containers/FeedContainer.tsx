import { COLOR } from '@/src/constants/theme';
import { useState } from 'react';
import styled from 'styled-components/native';
import HomeHeader from '../components/header/HomeHeader';
import { getTodayDateData } from '../utils/getTodayDateData';

const FeedContainer = () => {
  const [month, setMonth] = useState<number>(() => getTodayDateData().month);

  return (
    <Wrapper>
      <HomeHeader month={month} onChange={setMonth} />
    </Wrapper>
  );
};

export default FeedContainer;

const Wrapper = styled.View`
  flex: 1;
  padding: 0 15px;
  gap: 25px;
  background-color: ${COLOR.background};
`;
