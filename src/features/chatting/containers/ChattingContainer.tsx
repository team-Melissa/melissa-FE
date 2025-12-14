import { COLOR } from '@/src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';

const ChattingContainer = () => {
  const { aiProfileId, year, month, day } = useChattingQueryParams();

  return <SafeView></SafeView>;
};

export default ChattingContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
