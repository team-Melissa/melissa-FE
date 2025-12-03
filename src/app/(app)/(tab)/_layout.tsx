import TabBarContainer from '@/src/features/home/containers/TabBarContainer';
import { Tabs } from 'expo-router';

/**
 * @description Bottom tabs navigator layout
 */
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={TabBarContainer}>
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="feed" />
    </Tabs>
  );
}
