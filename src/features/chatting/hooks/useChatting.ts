import { useQueryClient } from "@tanstack/react-query";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import EventSource from "react-native-sse";
import { getAccessToken } from "@/src/libs/mmkv";
import { preventDoublePress } from "@/src/libs/esToolkit";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import { useIsKeyboardOpen } from "./useIsKeyboardOpen";
import { useMessagesQuery } from "./queries/useMessagesQuery";
import { useDiaryMutation } from "./mutations/useDiaryMutation";
import { useChangeAssistantMutation } from "./mutations/useChangeAssistantMutation";
import { checkThreadExpire } from "../utils/time";
import type { FluxEventDTO, MessagesDTO, TThreadDate } from "../types/chattingTypes";

export const useChatting = (threadDate: TThreadDate, threadExpiredDate: Date, readonly?: boolean) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isKeyboardOpen = useIsKeyboardOpen();

  const [input, setInput] = useState<string>("");
  const [isCanDiarySummary, setIsCanDiarySummary] = useState<boolean>(false);
  const [isAiTurn, setIsAiTurn] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { isPending, isError, data, refetch } = useMessagesQuery(threadDate);
  const { mutate: diaryMutate } = useDiaryMutation();
  const { mutate: changeAssistantMutate } = useChangeAssistantMutation(setIsVisible);

  const handleHeaderPress = () => {
    if (isKeyboardOpen) Keyboard.dismiss();
    setIsVisible(true);
  };

  const handlePressAiCard = (aiProfileId: number) => {
    changeAssistantMutate({ ...threadDate, aiProfileId });
  };

  const handleSubmitPress = preventDoublePress(() => {
    if (!input || readonly || isAiTurn) return;
    const token = getAccessToken();
    if (!token) return;
    if (checkThreadExpire(threadExpiredDate)) {
      toast(toastMessage.threadExpired);
      router.replace("/(app)/chatting");
      return;
    }

    // 실제 채팅 전송이 수행되는 지점, 사용자가 채팅을 한번이라도 입력해야만 언마운트 시 요약 프로세스가 동작하도록 flag 도입
    setIsCanDiarySummary(true);
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

  useEffect(() => {
    console.log(isCanDiarySummary);
    // 컴포넌트가 언마운트 될 때 일기 요약 실행
    return () => {
      if (isCanDiarySummary) {
        console.log("일기 요약을 진행합니다.");
        toast(toastMessage.updateDiary.pending);
        diaryMutate(threadDate);
      }
    };
  }, [isCanDiarySummary, threadDate, diaryMutate]);

  return {
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
  };
};
