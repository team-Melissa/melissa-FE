import { Fragment, useRef } from "react";
import { Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Image as Img } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import AssistantList from "@/src/components/AssistantList";
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

type ChattingContainerProps = {
  threadDate: TThreadDate;
  threadExpiredDate: Date;
  readonly?: boolean;
};

export default function ChattingContainer({ threadDate, threadExpiredDate, readonly }: ChattingContainerProps) {
  const router = useRouter();
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
      <AssistantList isVisible={isVisible} setIsVisible={setIsVisible} onPressAiCard={handlePressAiCard} />
      <SafeView edges={["left", "right", "top"]}>
        <HeaderBox>
          <BackButton onPress={() => router.back()} hitSlop={7}>
            <MaterialIcons name="arrow-back-ios" size={28} color={theme.colors.black} />
          </BackButton>
          <HeaderButton onPress={handleHeaderPress} hitSlop={7} disabled={readonly}>
            <Image src={data.result.aiProfileImageS3} />
            <AiNameText>{data.result.aiProfileName}</AiNameText>
          </HeaderButton>
        </HeaderBox>
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

const HeaderBox = styled.View`
  width: 100%;
  height: ${responsiveToPxByHeight("110px")};
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  padding: 0px ${responsiveToPx("24px")};
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;

const BackButton = styled.TouchableOpacity`
  width: ${responsiveToPx("28px")};
  height: ${responsiveToPx("28px")};
  justify-content: center;
  align-items: center;
`;

const HeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
  align-items: center;
`;

const Image = styled(CachedImage)`
  width: ${responsiveToPx("48px")};
  height: ${responsiveToPx("48px")};
  border-radius: 9999px;
`;

const AiNameText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
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
