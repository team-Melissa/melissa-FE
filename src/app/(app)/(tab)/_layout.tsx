import BottomTabNavigation from '@/src/core/BottomTabNavigation';
import { Tabs } from 'expo-router';

/**
 * @description Bottom tabs navigator layout
 */
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={BottomTabNavigation}>
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="feed" />
    </Tabs>
  );
}
