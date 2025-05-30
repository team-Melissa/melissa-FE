import { type ReactNode, type Dispatch, type SetStateAction, Fragment, useRef } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import ChatHeader from "../components/ChatHeader";
import AiChatBox from "../components/AiChatBox";
import UserChatBox from "../components/UserChatBox";
import ChatInput from "../components/ChatInput";
import { useChatting } from "../hooks/useChatting";
import type { TThreadDate } from "../types/chattingTypes";

type ChattingContainerProps =
  | {
      threadDate: TThreadDate;
      threadExpiredDate: Date;
      readonly?: false;
      renderAssistantList: (props: {
        isVisible: boolean;
        setIsVisible: Dispatch<SetStateAction<boolean>>;
        onPressAiCard: (id: number) => void;
      }) => ReactNode;
    }
  | {
      threadDate: TThreadDate;
      threadExpiredDate: Date;
      readonly: true;
    };

export default function ChattingContainer(props: ChattingContainerProps) {
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
  } = useChatting(props.threadDate, props.threadExpiredDate, props.readonly);

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return <CommonError titleText="채팅 내역을 불러오지 못했어요" buttonText="다시 불러오기" onPress={refetch} />;
  }

  return (
    <Fragment>
      {!props.readonly && props.renderAssistantList({ isVisible, setIsVisible, onPressAiCard: handlePressAiCard })}
      <SafeView edges={["left", "right", "top"]}>
        {/* Todo: placeholder 이미지로 변경되면, 타입 정리 필요 */}
        <ChatHeader
          imageSrc={data.result.aiProfileImageS3 ?? ""}
          assistantName={data.result.aiProfileName}
          onPress={handleHeaderPress}
          readonly={props.readonly}
        />
        <ScrollBox
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd();
          }}
        >
          {/* Todo: placeholder 이미지로 변경되면, 타입 정리 필요 */}
          {data.result.chats.map((chat) =>
            chat.role === "AI" ? (
              <AiChatBox content={chat.content} imageUrl={chat.aiProfileImageS3 ?? ""} key={chat.chatId} />
            ) : (
              <UserChatBox input={chat.content} key={chat.chatId} />
            )
          )}
        </ScrollBox>
        <ChatInput input={input} setInput={setInput} onSubmitPress={handleSubmitPress} readonly={props.readonly} />
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
