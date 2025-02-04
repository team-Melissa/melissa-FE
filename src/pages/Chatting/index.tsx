import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ChattingPage(): JSX.Element {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView>
      <Text>채팅 페이지 입니다</Text>
      <TouchableOpacity onPress={handleBackPress}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ChattingPage;
