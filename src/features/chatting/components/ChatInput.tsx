import { Platform } from "react-native";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";
import { IconSend } from "./icons";

type ChatInputProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onSubmitPress: () => void;
  readonly?: boolean;
};

export default function ChatInput({ input, setInput, onSubmitPress, readonly }: ChatInputProps) {
  if (readonly) return null;

  return (
    <KeyboardAvoidingBox behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ChatInputBox>
        <StyledChatInput
          placeholder="오늘 하루에 대해 말해주세요"
          multiline={true}
          value={input}
          onChangeText={(e) => setInput(e)}
          hitSlop={15}
          placeholderTextColor={theme.colors.placeholderText}
        />
        <ChatButton hitSlop={15} onPress={onSubmitPress}>
          <IconSend />
        </ChatButton>
      </ChatInputBox>
    </KeyboardAvoidingBox>
  );
}

const KeyboardAvoidingBox = styled.KeyboardAvoidingView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  justify-content: center;
  align-items: center;
`;

const ChatInputBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding-top: ${responsiveToPx("10px")};
  gap: ${({ theme }) => theme.gap.md};
  padding-bottom: ${responsiveToPx("30px")};
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
  justify-content: center;
  align-items: center;
`;
