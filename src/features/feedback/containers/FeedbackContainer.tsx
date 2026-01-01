import { COLOR } from '@/src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const FeedbackContainer = () => {
  return <SafeView></SafeView>;
};

export default FeedbackContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
