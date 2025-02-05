import { Fragment, useRef, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EventSource from "react-native-sse";
import { changeAiFn, getMessagesFn } from "@/src/apis/threadApi";
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

interface Props {
  threadDate: ThreadDate;
  expiredDate: Date;
}

function ChattingPage({ threadDate, expiredDate }: Props): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, isError, data, refetch } = useQuery({
    queryFn: () => getMessagesFn(threadDate),
    queryKey: ["message", threadDate],
  });

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

  const handleSubmitPress = () => {
    if (!input) return;
    const token = getAccessToken();
    if (!token) return;
    if (checkThreadExpire(expiredDate)) {
      showToast(toastMessage.threadExpired, "success");
      router.replace("/(app)/chatting");
      return;
    }
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
    console.log(token);
    const es = new EventSource<FluxEvent>(
      `${process.env.EXPO_PUBLIC_API_URL}${endpoint.thread.send}?content=${input}&year=${threadDate.year}&month=${threadDate.month}&day=${threadDate.day}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "text/event-stream",
        },
        method: "POST",
      }
    );
    es.addEventListener("error", (error) => console.error(error));
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
  };

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
          <S.HeaderButton onPress={handleHeaderPress} hitSlop={7}>
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
        <S.ChatInputBox behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <S.ChatInput
            placeholder="오늘 하루에 대해 말해주세요"
            value={input}
            onChangeText={handleChangeText}
            hitSlop={15}
            placeholderTextColor={theme.colors.placeholderText}
          />
          <S.ChatButton hitSlop={15} style={shadowProps} onPress={handleSubmitPress}>
            <S.ButtonImage source={require("@/assets/images/chatButton.png")} />
          </S.ChatButton>
        </S.ChatInputBox>
      </S.SafeView>
    </Fragment>
  );
}

export default ChattingPage;
