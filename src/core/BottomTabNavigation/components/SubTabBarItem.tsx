import { NavButton } from '@/src/core/Button';
import { IconChat } from '@/src/icons';
import { getTodayDate } from '@/src/utils/date';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

const SubTabBarItem = () => {
  const { year, month, day } = getTodayDate();
  const router = useRouter();

  const goToChattingPage = () => {
    router.navigate(`/(app)/characters?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <Wrapper>
      <NavButton size="small" onPress={goToChattingPage}>
        <IconChat />
      </NavButton>
    </Wrapper>
  );
};

export default SubTabBarItem;

const Wrapper = styled.View`
  flex-direction: row;
  padding: 3px;
  gap: 10px;
  border-radius: 99px;
`;
