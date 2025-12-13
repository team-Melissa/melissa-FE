import { Description3 } from '@/src/core/Txt';
import characters from '@/src/modules/character';
import { parseIso8601DateString } from '@/src/utils/date';
import styled from 'styled-components/native';

type Props = {
  aiProfileId: number;
  createdAt: string;
};

const getCreatedAtText = (createdAt: string) => {
  const { year, month, day } = parseIso8601DateString(createdAt);
  return `${year.toString().slice(-2)}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
};

const DiaryCreatedByInfo = ({ createdAt, aiProfileId }: Props) => {
  const character = characters[aiProfileId as keyof typeof characters];
  if (!character) return null;

  const { face: Face, name: characterName, color: characterBackgroundColor } = character;

  return (
    <Wrapper>
      <AiProfileIconWrapper $color={characterBackgroundColor}>
        <Face width={28} height={28} />
      </AiProfileIconWrapper>
      <Description3 color="sub1">
        {getCreatedAtText(createdAt)} {characterName}와 함께 생성했어요.
      </Description3>
    </Wrapper>
  );
};

export default DiaryCreatedByInfo;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const AiProfileIconWrapper = styled.View<{ $color: string }>`
  aspect-ratio: 1;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  padding: 2px;
  background-color: ${({ $color }) => $color};
`;
