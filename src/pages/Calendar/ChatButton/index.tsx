import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";

interface Props {
  onPress: () => void;
}

function ChatButton({ onPress }: Props): JSX.Element {
  return (
    <S.Btn style={shadowProps} onPress={onPress}>
      <S.ButtonImage source={require("@/assets/images/chatButton.png")} contentFit="cover" />
    </S.Btn>
  );
}

export default ChatButton;
