import styled from "styled-components/native";
import { useMessagesQuery } from "../hooks/queries/useMessagesQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import ChatHeader from "../components/ChatHeader";
import { useRef } from "react";
import AiChatBox from "../components/AiChatBox";
import UserChatBox from "../components/UserChatBox";
import responsiveToPx from "@/src/utils/responsiveToPx";

type Props = {
  year: number;
  month: number;
  day: number;
};

const ReadOnlyChattingContainer = ({ year, month, day }: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { data: messages } = useMessagesQuery({ year, month, day });

  return (
    <SafeView edges={["left", "right", "top"]}>
      <ChatHeader
        imageSrc={messages?.result.aiProfileImageS3 ?? ""}
        assistantName={messages?.result.aiProfileName ?? ""}
      />
      <ScrollBox
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd();
        }}
      >
        {messages?.result.chats.map((chat) =>
          chat.role === "AI" ? (
            <AiChatBox content={chat.content} imageUrl={chat.aiProfileImageS3} key={chat.chatId} />
          ) : (
            <UserChatBox input={chat.content} key={chat.chatId} />
          )
        )}
        <PaddingBox />
      </ScrollBox>
    </SafeView>
  );
};

export default ReadOnlyChattingContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ScrollBox = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

const PaddingBox = styled.View`
  width: 100%;
  height: ${responsiveToPx("40px")};
`;
