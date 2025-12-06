import { COLOR } from '@/src/constants/theme';
import BottomTabNavigation from '@/src/core/BottomTabNavigation';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

/**
 * @description Bottom tabs navigator layout
 */
export default function TabsLayout() {
  return (
    <TabsLayoutSafeView>
      <Tabs screenOptions={{ headerShown: false }} tabBar={BottomTabNavigation}>
        <Tabs.Screen name="calendar" />
        <Tabs.Screen name="feed" />
      </Tabs>
    </TabsLayoutSafeView>
  );
}

const TabsLayoutSafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;
