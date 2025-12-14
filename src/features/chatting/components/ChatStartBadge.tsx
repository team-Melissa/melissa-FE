import { Description2 } from '@/src/core/Txt';
import type { CharacterId } from '@/src/modules/character';
import characters from '@/src/modules/character';
import styled from 'styled-components/native';

type Props = {
  characterId: CharacterId;
  year: number;
  month: number;
  day: number;
};

const ChatStartBadge = ({ characterId, year, month, day }: Props) => {
  const { name, color } = characters[characterId];

  return (
    <Wrapper>
      <BadgeWrapper style={{ backgroundColor: color }}>
        <Description2 color="sub2">
          {year}년 {month}월 {day}일
        </Description2>
      </BadgeWrapper>
      <Description2 color="sub1">{name}와 함께 일기 작성 시작!</Description2>
    </Wrapper>
  );
};

export default ChatStartBadge;

const Wrapper = styled.View`
  align-items: center;
  gap: 5px;
`;

const BadgeWrapper = styled.View`
  padding: 5px 10px;
  border-radius: 99px;
`;
