import { type ReactNode, type Dispatch, type SetStateAction, Fragment, useRef } from "react";
import { Platform, ScrollView } from "react-native";
import { Image as Img } from "expo-image";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import CachedImage from "@/src/components/ui/CachedImage";
import { shadowProps } from "@/src/constants/shadowProps";
import { theme } from "@/src/constants/theme";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import AiChatBox from "../components/AiChatBox";
import UserChatBox from "../components/UserChatBox";
import { useChatting } from "../hooks/useChatting";
import type { TThreadDate } from "../types/chattingTypes";
import ChatHeader from "../components/ChatHeader";

type ChattingContainerProps = {
  threadDate: TThreadDate;
  threadExpiredDate: Date;
  readonly?: boolean;
  renderAssistantList: (props: {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    onPressAiCard: (id: number) => void;
  }) => ReactNode;
};

export default function ChattingContainer({
  threadDate,
  threadExpiredDate,
  renderAssistantList,
  readonly,
}: ChattingContainerProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const {
    data,
    isPending,
    isError,
    isVisible,
    input,
    setIsVisible,
    setInput,
    refetch,
    handlePressAiCard,
    handleHeaderPress,
    handleSubmitPress,
  } = useChatting(threadDate, threadExpiredDate, readonly);

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return <CommonError titleText="채팅 내역을 불러오지 못했어요" buttonText="다시 불러오기" onPress={refetch} />;
  }

  return (
    <Fragment>
      {renderAssistantList({ isVisible, setIsVisible, onPressAiCard: handlePressAiCard })}
      <SafeView edges={["left", "right", "top"]}>
        <ChatHeader
          imageSrc={data.result.aiProfileImageS3}
          assistantName={data.result.aiProfileName}
          onPress={handleHeaderPress}
          readonly={readonly}
        />
        <ScrollBox
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd();
          }}
        >
          {data.result.chats.map((chat) =>
            chat.role === "AI" ? (
              <AiChatBox content={chat.content} imageUrl={chat.aiProfileImageS3} key={chat.chatId} />
            ) : (
              <UserChatBox input={chat.content} key={chat.chatId} />
            )
          )}
        </ScrollBox>
        <KeyboardAvoidingBox behavior={Platform.OS === "ios" ? "padding" : "height"}>
          {!readonly && (
            <ChatInputBox>
              <ChatInput
                placeholder="오늘 하루에 대해 말해주세요"
                multiline={true}
                value={input}
                onChangeText={(e) => setInput(e)}
                hitSlop={15}
                placeholderTextColor={theme.colors.placeholderText}
              />
              <ChatButton hitSlop={15} style={shadowProps} onPress={handleSubmitPress}>
                <ButtonImage source={require("@/assets/images/chatButton.png")} />
              </ChatButton>
            </ChatInputBox>
          )}
        </KeyboardAvoidingBox>
      </SafeView>
    </Fragment>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ScrollBox = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

const KeyboardAvoidingBox = styled.KeyboardAvoidingView`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ChatInputBox = styled.View`
  width: 100%;
  min-height: ${responsiveToPx("100px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: ${({ theme }) => theme.gap.md};
  padding-bottom: ${responsiveToPx("40px")};
`;

const ChatInput = styled.TextInput`
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
