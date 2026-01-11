import { useGetCurrentStreak } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { Label } from '@/src/core/Txt';
import { IconCharacter } from '@/src/icons';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const StreakBadge = () => {
  const { isPending, data: streakData } = useGetCurrentStreak();
  const streak = streakData?.result?.streakDays ?? 0;

  return (
    <Wrapper>
      <StyledIconCharacter />
      {isPending ? <ActivityIndicator /> : <Label color="title">{streak.toLocaleString()}</Label>}
    </Wrapper>
  );
};

export default StreakBadge;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 5px 10px 5px 0;
  border-radius: 99px;
  background-color: ${COLOR.white};
  overflow: visible;
`;

const StyledIconCharacter = styled(IconCharacter)`
  right: 5px;
  top: -1px;
  align-items: center;
  align-self: center;
  overflow: visible;
`;
