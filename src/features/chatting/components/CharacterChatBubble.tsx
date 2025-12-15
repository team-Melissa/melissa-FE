import { COLOR } from '@/src/constants/theme';
import { Body1, Description1 } from '@/src/core/Txt';
import type { CharacterId } from '@/src/modules/character';
import characters from '@/src/modules/character';
import responsiveToPx from '@/src/utils/responsiveToPx';
import styled from 'styled-components/native';
import type { ChatData } from '../types';

type Props = {
  characterId: CharacterId;
  chat: ChatData;
};

const CharacterChatBubble = ({ characterId, chat }: Props) => {
  const { name, face: Face, color } = characters[characterId];

  return (
    <Wrapper>
      <CharacterWrapper>
        <FaceWrapper $color={color}>
          <Face width={24} />
        </FaceWrapper>
        <Description1 color="title">{name}</Description1>
      </CharacterWrapper>
      <BubbleWrapper>
        <Body1 color="sub1">{chat.content}</Body1>
      </BubbleWrapper>
    </Wrapper>
  );
};

export default CharacterChatBubble;

const Wrapper = styled.View`
  gap: 5px;
`;

const CharacterWrapper = styled.View`
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const FaceWrapper = styled.View<{ $color: string }>`
  width: ${responsiveToPx('28px')};
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ $color }) => $color};
  padding: 4px;
  border-radius: 99px;
`;

const BubbleWrapper = styled.View`
  max-width: ${responsiveToPx('250px')};
  align-self: flex-start;
  padding: 10px 12px;
  margin-left: ${responsiveToPx('28px')};
  border-radius: 13px;
  background-color: ${COLOR.white};
`;
