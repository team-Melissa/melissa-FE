import { COLOR } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ChattingHeader from '../components/ChattingHeader';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';

const ChattingContainer = () => {
  const { aiProfileId, year, month, day } = useChattingQueryParams();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <SafeView>
      <ChattingHeader characterId={aiProfileId} onBackClick={handleBackClick} />
    </SafeView>
  );
};

export default ChattingContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
