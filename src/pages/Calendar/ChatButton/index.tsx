import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";
import { useRouter } from "expo-router";

function ChatButton(): JSX.Element {
  const router = useRouter();

  const handleChattingPress = () => {
    router.push("/(app)/chatting");
  };

  return (
    <S.Btn style={shadowProps} onPress={handleChattingPress}>
      <S.ButtonImage source={require("@/assets/images/chatButton.png")} contentFit="cover" />
    </S.Btn>
  );
}

export default ChatButton;
