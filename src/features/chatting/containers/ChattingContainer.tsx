import { useGetMessages } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ChattingHeader from '../components/ChattingHeader';
import ChattingStartBadge from '../components/ChattingStartBadge';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';
import { chatListFilter } from '../utils';

const ChattingContainer = () => {
  const { aiProfileId, year, month, day } = useChattingQueryParams();
  const router = useRouter();

  const { data: chatList } = useGetMessages(
    { aiProfileId, year, month, day },
    {
      query: {
        select: chatListFilter,
      },
    }
  );

  const handleBackClick = () => {
    router.back();
  };

  if (!chatList) return null;

  return (
    <SafeView>
      <ChattingHeader characterId={aiProfileId} onBackClick={handleBackClick} />
      <StyledScrollView>
        <ChattingStartBadge characterId={aiProfileId} year={year % 100} month={month} day={day} />
      </StyledScrollView>
    </SafeView>
  );
};

export default ChattingContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;
