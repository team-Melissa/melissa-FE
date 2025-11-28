import TabBarContainer from "@/src/features/home/containers/TabBarContainer";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={TabBarContainer}>
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="feed" />
    </Tabs>
  );
}
