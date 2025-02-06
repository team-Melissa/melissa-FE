import { Fragment, useEffect, useRef, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EventSource from "react-native-sse";
import { changeAiFn, getMessagesFn } from "@/src/apis/threadApi";
import useUpdateDiary from "@/src/hooks/useUpdateDiary";
import AssistantList from "@/src/components/AssistantList";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import UserChatBox from "./UserChatBox";
import AiChatBox from "./AiChatBox";
import toastMessage from "@/src/constants/toastMessage";
import { shadowProps } from "@/src/constants/shadowProps";
import endpoint from "@/src/constants/endpoint";
import { checkThreadExpire } from "@/src/utils/time";
import showToast from "@/src/libs/showToast";
import { getAccessToken, setAiProfileId } from "@/src/libs/mmkv";
import { FluxEvent, MessageResult, ThreadDate } from "@/src/types/threadTypes";
import { theme } from "@/src/constants/theme";
import * as S from "./styles";
import { preventDoublePress } from "@/src/libs/esToolkit";

interface Props {
  threadDate: ThreadDate;
  expiredDate: Date;
  readonly?: boolean;
}

function ChattingPage({ threadDate, expiredDate, readonly }: Props): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isCanDiarySummary, setIsCanDiarySummary] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, isError, data, refetch } = useQuery({
    queryFn: () => getMessagesFn(threadDate),
    queryKey: ["message", threadDate],
  });

  // 채팅 페이지에서 언마운트 될 때, 현재 채팅 페이지 날짜 요약 요청
  const { mutate: updateDiaryMutate } = useUpdateDiary();

  // AI 변경 시 사용되는 useMutation
  const { mutate } = useMutation({
    mutationFn: changeAiFn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["message", threadDate] });
      showToast(toastMessage.changeAssistant.success, "success");
      setIsVisible(false);
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.changeAssistant.failed, "error");
    },
  });

  const handleHeaderPress = () => {
    setIsVisible(true);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handlePressAiCard = (aiProfileId: number) => {
    setAiProfileId(aiProfileId);
    mutate({ ...threadDate, aiProfileId });
  };

  const handleChangeText = (e: string) => {
    setInput(e);
  };

  const handleSubmitPress = preventDoublePress(() => {
    if (!input || readonly) return; // readonly면 제출 기능 막기
    const token = getAccessToken();
    if (!token) return;
    if (checkThreadExpire(expiredDate)) {
      showToast(toastMessage.threadExpired, "success");
      router.replace("/(app)/chatting");
      return;
    }
    // 실제 채팅 전송이 수행되는 지점, 사용자가 채팅을 한번이라도 입력해야만 언마운트 시 요약 프로세스가 동작하도록 flag 도입
    setIsCanDiarySummary(true);
    queryClient.setQueryData<MessageResult>(
      ["message", threadDate],
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
    const es = new EventSource<FluxEvent>(
      `${process.env.EXPO_PUBLIC_API_URL}${endpoint.thread.send}`,
      {
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
      }
    );
    es.addEventListener("error", (error) => {
      console.error(error);
      // 어떠한 이유로 SSE에 에러가 발생하면, EventSource를 해제
      queryClient.invalidateQueries({ queryKey: ["message", threadDate] });
      es.removeAllEventListeners();
      es.close();
    });
    es.addEventListener("aiMessage", (event) => {
      queryClient.setQueryData<MessageResult>(["message", threadDate], (prev) => {
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
      queryClient.invalidateQueries({ queryKey: ["message", threadDate] });
      es.removeAllEventListeners();
      es.close();
    });
  });

  useEffect(() => {
    console.log(isCanDiarySummary);
    // 컴포넌트가 언마운트 될 때 일기 요약 실행
    return () => {
      if (isCanDiarySummary) {
        console.log("일기 요약을 진행합니다.");
        showToast(toastMessage.updateDiary.pending, "success");
        updateDiaryMutate(threadDate);
      }
    };
  }, [isCanDiarySummary, threadDate, updateDiaryMutate]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <CommonError
        titleText="채팅 내역을 불러오지 못했어요"
        buttonText="다시 불러오기"
        onPress={refetch}
      />
    );
  }

  return (
    <Fragment>
      <AssistantList
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onPressAiCard={handlePressAiCard}
      />
      <S.SafeView edges={["left", "right", "top"]}>
        <S.HeaderBox>
          <S.BackButton onPress={handleBackPress} hitSlop={7}>
            <MaterialIcons name="arrow-back-ios" size={28} color={theme.colors.black} />
          </S.BackButton>
          <S.HeaderButton onPress={handleHeaderPress} hitSlop={7} disabled={readonly}>
            <S.Image source={{ uri: data.result.aiProfileImageS3 }} />
            <S.AiNameText>{data.result.aiProfileName}</S.AiNameText>
          </S.HeaderButton>
        </S.HeaderBox>
        <S.ScrollBox
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd();
          }}
        >
          {data.result.chats.map((chat) =>
            chat.role === "AI" ? (
              <AiChatBox
                content={chat.content}
                imageUrl={chat.aiProfileImageS3}
                key={chat.chatId}
              />
            ) : (
              <UserChatBox input={chat.content} key={chat.chatId} />
            )
          )}
        </S.ScrollBox>
        <S.KeyboardAvoidingBox behavior={Platform.OS === "ios" ? "padding" : "height"}>
          {!readonly && (
            <S.ChatInputBox>
              <S.ChatInput
                placeholder="오늘 하루에 대해 말해주세요"
                multiline={true}
                value={input}
                onChangeText={handleChangeText}
                hitSlop={15}
                placeholderTextColor={theme.colors.placeholderText}
              />
              <S.ChatButton hitSlop={15} style={shadowProps} onPress={handleSubmitPress}>
                <S.ButtonImage source={require("@/assets/images/chatButton.png")} />
              </S.ChatButton>
            </S.ChatInputBox>
          )}
        </S.KeyboardAvoidingBox>
      </S.SafeView>
    </Fragment>
  );
}

export default ChattingPage;
