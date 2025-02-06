import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";
import { useRouter } from "expo-router";
import { preventDoublePress } from "@/src/libs/esToolkit";

function ChatButton(): JSX.Element {
  const router = useRouter();

  const handleChattingPress = preventDoublePress(() => router.push("/(app)/chatting"));

  return (
    <S.Btn style={shadowProps} onPress={handleChattingPress}>
      <S.ButtonImage source={require("@/assets/images/chatButton.png")} contentFit="cover" />
    </S.Btn>
  );
}

export default ChatButton;
