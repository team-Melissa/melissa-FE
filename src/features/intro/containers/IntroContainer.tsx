import { COLOR } from '@/src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import IntroAnimationView from '../components/IntroAnimationView';

const IntroContainer = () => {
  return (
    <Wrapper>
      <IntroAnimationView />
    </Wrapper>
  );
};

export default IntroContainer;

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.black};
`;
