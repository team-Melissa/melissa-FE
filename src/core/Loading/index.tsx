import { COLOR } from '@/src/constants/theme';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const CommonLoading = () => {
  return (
    <Wrapper>
      <ActivityIndicator size="large" />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.background};
`;
