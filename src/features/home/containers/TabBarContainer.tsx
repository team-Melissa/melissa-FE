import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import MainTabBarItem from "../components/tabBar/MainTabBarItem";
import SubTabBarItem from "../components/tabBar/SubTabBarItem";

const TabBarContainer = (props: BottomTabBarProps) => {
  return (
    <>
      <MainTabBarItem {...props} />
      <SubTabBarItem />
    </>
  );
};

export default TabBarContainer;
