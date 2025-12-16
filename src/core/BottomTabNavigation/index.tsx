import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import MainTabBarItem from './components/MainTabBarItem';
import SubTabBarItem from './components/SubTabBarItem';

const BottomTabNavigation = (props: BottomTabBarProps) => {
  return (
    <Wrapper>
      <MainTabBarItem {...props} />
      <SubTabBarItem />
    </Wrapper>
  );
};

export default BottomTabNavigation;

const Wrapper = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px 10px 30px;
  background-color: transparent;
`;
