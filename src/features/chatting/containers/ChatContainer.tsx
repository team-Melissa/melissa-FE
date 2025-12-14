import { useGetMessages } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ChatHeader from '../components/ChatHeader';
import ChatStartBadge from '../components/ChatStartBadge';
import { useChattingQueryParams } from '../hooks/useChattingQueryParams';
import { chatListFilter } from '../utils';

const ChatContainer = () => {
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
      <ChatHeader characterId={aiProfileId} onBackClick={handleBackClick} />
      <StyledScrollView>
        <ChatStartBadge characterId={aiProfileId} year={year % 100} month={month} day={day} />
      </StyledScrollView>
    </SafeView>
  );
};

export default ChatContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;
