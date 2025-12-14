import { COLOR } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ChattingHeader from '../components/ChattingHeader';
import ChattingStartBadge from '../components/ChattingStartBadge';
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
      <ScrollView>
        <ChattingStartBadge characterId={aiProfileId} year={year % 100} month={month} day={day} />
      </ScrollView>
    </SafeView>
  );
};

export default ChattingContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
