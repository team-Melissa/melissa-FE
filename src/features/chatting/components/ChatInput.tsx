import { Platform } from "react-native";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { shadowProps } from "@/src/constants/shadowProps";
import { theme } from "@/src/constants/theme";
import { useIsKeyboardOpen } from "../hooks/useIsKeyboardOpen";

type ChatInputProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onSubmitPress: () => void;
  readonly?: boolean;
};

export default function ChatInput({ input, setInput, onSubmitPress, readonly }: ChatInputProps) {
  const isKeyboardOpen = useIsKeyboardOpen();

  if (readonly) return null;

  return (
    <KeyboardAvoidingBox behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ChatInputBox $isKeyboardOpen={isKeyboardOpen}>
        <StyledChatInput
          placeholder="오늘 하루에 대해 말해주세요"
          multiline={true}
          value={input}
          onChangeText={(e) => setInput(e)}
          hitSlop={15}
          placeholderTextColor={theme.colors.placeholderText}
        />
        <ChatButton hitSlop={15} style={shadowProps} onPress={onSubmitPress}>
          <ButtonImage source={require("@/assets/images/chatButton.png")} />
        </ChatButton>
      </ChatInputBox>
      <InfoText>{!isKeyboardOpen && "뒤로 가기 버튼을 누르면 대화가 자동으로 요약됩니다"}</InfoText>
    </KeyboardAvoidingBox>
  );
}

const KeyboardAvoidingBox = styled.KeyboardAvoidingView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  justify-content: center;
  align-items: center;
`;

const ChatInputBox = styled.View<{ $isKeyboardOpen: boolean }>`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: ${({ theme }) => theme.gap.md};
  padding-bottom: ${({ $isKeyboardOpen }) => ($isKeyboardOpen ? "0px" : responsiveToPx("40px"))};
`;

const StyledChatInput = styled.TextInput`
  width: ${responsiveToPx("333px")};
  max-height: ${responsiveToPx("100px")};
  padding: ${responsiveToPx("11px")} ${responsiveToPx("16px")};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const ChatButton = styled.TouchableOpacity`
  width: ${responsiveToPx("44px")};
  height: ${responsiveToPx("44px")};
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonImage = styled(Img)`
  width: 120%;
  height: 120%;
`;

const InfoText = styled.Text`
  text-align: center;
  bottom: ${responsiveToPxByHeight("30px")};
  color: ${({ theme }) => theme.colors.assistantChat};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
