import { useRef, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import ChatHeader from "../components/ChatHeader";
import AiChatBox from "../components/AiChatBox";
import UserChatBox from "../components/UserChatBox";
import ChatInput from "../components/ChatInput";
import type { FluxEventDTO, MessagesDTO, TThreadDate } from "../types/chattingTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMessagesQuery } from "../hooks/queries/useMessagesQuery";
import { preventDoublePress } from "@/src/libs/esToolkit";
import { checkThreadExpire } from "../utils/time";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import EventSource from "react-native-sse";
import endpoint from "@/src/constants/endpoint";
import { getAccessToken } from "@/src/libs/mmkv";
import { useDiaryMutation } from "../hooks/mutations/useDiaryMutation";
import ChattingMenu from "../components/ChattingMenu";
import type BottomSheet from "@gorhom/bottom-sheet";

type Props = {
  threadDate: TThreadDate;
  threadExpiredDate: Date;
  readonly?: boolean;
};

export default function ChattingContainer({ threadDate, threadExpiredDate, readonly }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [isAiTurn, setIsAiTurn] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const menuRef = useRef<BottomSheet>(null);

  const { isPending, isError, data, refetch } = useMessagesQuery(threadDate);

  const { mutate: saveMutate } = useDiaryMutation();

  const handleSubmitPress = preventDoublePress(() => {
    if (!input || readonly || isAiTurn) return;

    const token = getAccessToken();
    if (!token) return;

    if (checkThreadExpire(threadExpiredDate)) {
      toast({ message: toastMessage.threadExpired, options: { type: "success" } });
      return router.replace("/(app)/chatting");
    }

    setIsAiTurn(true); // 채팅 제출 후 답변 오기 전에 다시 제출하지 못하도록
    queryClient.setQueryData<MessagesDTO>(
      ["messages", threadDate.year, threadDate.month, threadDate.day],
      (prev) =>
        prev && {
          ...prev,
          result: {
            ...prev.result,
            chats: [
              ...prev.result.chats,
              {
                role: "USER",
                chatId: -100,
                content: input,
                createAt: "",
                aiProfileName: "",
                aiProfileImageS3: "",
              },
            ],
          },
        }
    );
    setInput("");
    const es = new EventSource<FluxEventDTO>(`${process.env.EXPO_PUBLIC_API_URL}${endpoint.thread.send}`, {
      headers: {
        Authorization: token,
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: threadDate.year,
        month: threadDate.month,
        day: threadDate.day,
        content: input,
      }),
      method: "POST",
    });
    es.addEventListener("error", (error) => {
      toast({ message: "응답을 수신하지 못했어요.", options: { type: "error" } });
      console.error(error);
      // 어떠한 이유로 SSE에 에러가 발생하면, EventSource를 해제
      queryClient.invalidateQueries({ queryKey: ["messages", threadDate.year, threadDate.month, threadDate.day] });
      es.removeAllEventListeners();
      es.close();
      setIsAiTurn(false);
    });
    es.addEventListener("aiMessage", (event) => {
      queryClient.setQueryData<MessagesDTO>(["messages", threadDate.year, threadDate.month, threadDate.day], (prev) => {
        if (prev) {
          const chats = prev.result.chats;
          if (chats[chats.length - 1].role === "USER") {
            return {
              ...prev,
              result: {
                ...prev.result,
                chats: [
                  ...chats,
                  {
                    role: "AI",
                    chatId: -101,
                    content: "",
                    createAt: "",
                    aiProfileName: prev.result.aiProfileName,
                    aiProfileImageS3: prev.result.aiProfileImageS3,
                  },
                ],
              },
            };
          } else {
            const last = chats[chats.length - 1];
            const newLast = {
              ...last,
              content: last.content + event.data,
            };
            chats.pop();
            return {
              ...prev,
              result: {
                ...prev.result,
                chats: [...chats, newLast],
              },
            };
          }
        }
      });
    });
    es.addEventListener("finish", () => {
      queryClient.invalidateQueries({ queryKey: ["messages", threadDate.year, threadDate.month, threadDate.day] });
      es.removeAllEventListeners();
      es.close();
      setIsAiTurn(false);
    });
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return <CommonError titleText="채팅 내역을 불러오지 못했어요" buttonText="다시 불러오기" onPress={refetch} />;
  }

  return (
    <SafeView edges={["left", "right", "top"]}>
      <ChatHeader
        imageSrc={data.result.aiProfileImageS3}
        assistantName={data.result.aiProfileName}
        onMenuPress={() => menuRef.current?.expand()}
        onSavePress={() => saveMutate(threadDate)}
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
      <ChatInput input={input} setInput={setInput} onSubmitPress={handleSubmitPress} readonly={readonly} />
      <ChattingMenu ref={menuRef} />
    </SafeView>
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
