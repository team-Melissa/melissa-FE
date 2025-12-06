import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MainTabBarItem from './components/MainTabBarItem';
import SubTabBarItem from './components/SubTabBarItem';

const BottomTabNavigation = (props: BottomTabBarProps) => {
  return (
    <>
      <MainTabBarItem {...props} />
      <SubTabBarItem />
    </>
  );
};

export default BottomTabNavigation;
