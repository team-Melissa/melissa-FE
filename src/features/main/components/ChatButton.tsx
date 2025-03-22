import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { preventDoublePress } from "@/src/libs/esToolkit";
import { shadowProps } from "@/src/constants/shadowProps";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";

export default function ChatButton() {
  const router = useRouter();

  const handleChattingPress = preventDoublePress(() => router.push("/(app)/chatting"));

  return (
    <Button style={shadowProps} onPress={handleChattingPress}>
      <ButtonImage source={require("@/assets/images/chatButton.png")} contentFit="cover" />
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  width: ${responsiveToPx("60px")};
  height: ${responsiveToPx("60px")};
  position: absolute;
  bottom: ${responsiveToPxByHeight("70px")};
  left: 50%;
  border-radius: 9999px;
  transform: translateX(-${responsiveToPx("30px")});
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonImage = styled(Image)`
  width: 120%;
  height: 120%;
`;
