import { COLOR } from '@/src/constants/theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import HomeHeader from '../components/header/HomeHeader';
import { getTodayDateData } from '../utils/getTodayDateData';

const FeedContainer = () => {
  const [month, setMonth] = useState<number>(() => getTodayDateData().month);

  return (
    <SafeView>
      <Wrapper>
        <HomeHeader month={month} onChange={setMonth} />
      </Wrapper>
    </SafeView>
  );
};

export default FeedContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;

const Wrapper = styled.View`
  padding: 0 15px;
`;
