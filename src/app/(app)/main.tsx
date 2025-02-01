import { useState } from "react";
import AssistantList from "@/src/components/AssistantList";
import Button from "@/src/components/ui/Button";
import CalendarPage from "@/src/pages/Calendar";
import { View } from "react-native";

/**
 * @description 달력 나오는 페이지의 라우터
 */
function MainRouter() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <View style={{ position: "relative", flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AssistantList isVisible={isVisible} setIsVisible={setIsVisible} />
      <CalendarPage />
      <Button onPress={handleVisible}>눌러보셈</Button>
    </View>
  );
}
export default MainRouter;
