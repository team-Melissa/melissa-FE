import type { CharacterId } from '@/src/modules/character';
import { useRef } from 'react';
import { ScrollView } from 'react-native';
import type { ChatData } from '../types';
import CharacterChatBubble from './CharacterChatBubble';
import ChatStartBadge from './ChatStartBadge';
import UserChatBubble from './UserChatBubble';

type Props = {
  chatData: ChatData[];
  characterId: CharacterId;
  year: number;
  month: number;
  day: number;
};

const INVERTED_Y_TRANSFORM = { transform: [{ scaleY: -1 }] } as const;

const ChatScrollView = ({ chatData, characterId, year, month, day }: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const reversedChatData = chatData.toReversed();

  const handleContentSizeChange = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1, ...INVERTED_Y_TRANSFORM }}
      contentContainerStyle={{ rowGap: 15, flexGrow: 1, justifyContent: 'flex-end' }}
      onContentSizeChange={handleContentSizeChange}
    >
      {reversedChatData.map((chat) =>
        chat.role === 'AI' ? (
          <CharacterChatBubble key={chat.chatId} characterId={characterId} chat={chat} style={INVERTED_Y_TRANSFORM} />
        ) : (
          <UserChatBubble key={chat.chatId} chat={chat} style={INVERTED_Y_TRANSFORM} />
        )
      )}
      <ChatStartBadge
        characterId={characterId}
        year={year % 100}
        month={month}
        day={day}
        style={INVERTED_Y_TRANSFORM}
      />
    </ScrollView>
  );
};

export default ChatScrollView;
