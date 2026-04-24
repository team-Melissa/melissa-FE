import type { CharacterId } from '@/src/modules/character';
import { useRef } from 'react';
import { ScrollView } from 'react-native';
import type { ChatData } from '../types';
import { CharacterChatBubble } from './CharacterChatBubble';
import { CharacterLoadingBubble } from './CharacterLoadingBubble';
import { ChatStartBadge } from './ChatStartBadge';
import { UserChatBubble } from './UserChatBubble';

type Props = {
  isAwaitingResponse: boolean;
  chatData: ChatData[];
  characterId: CharacterId;
  year: number;
  month: number;
  day: number;
};

const INVERTED_Y_TRANSFORM = { transform: [{ scaleY: -1 }] } as const;

export const ChatScrollView = ({ isAwaitingResponse, chatData, characterId, year, month, day }: Props) => {
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
      {isAwaitingResponse && <CharacterLoadingBubble characterId={characterId} style={INVERTED_Y_TRANSFORM} />}
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
