import { COLOR } from '@/src/constants/theme';
import { NavButton } from '@/src/core/Button';
import { IconCalendar, IconFeed } from '@/src/icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

const MainTabBarItem = ({ state, navigation }: BottomTabBarProps) => {
  const { index } = state;
  const { navigate } = navigation;

  const goToCalendar = () => {
    navigate('calendar');
  };

  const goToFeed = () => {
    navigate('feed');
  };

  return (
    <Wrapper>
      <NavButton active={index === 0} onPress={goToCalendar}>
        <IconCalendar active={index === 0} />
      </NavButton>
      <NavButton active={index === 1} onPress={goToFeed}>
        <IconFeed active={index === 1} />
      </NavButton>
    </Wrapper>
  );
};

export default MainTabBarItem;

const Wrapper = styled.View`
  flex-direction: row;
  padding: 3px;
  background-color: ${COLOR.white};
  border-radius: 99px;
`;
