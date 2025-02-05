import { Fragment, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeAiFn, getMessagesFn } from "@/src/apis/threadApi";
import AssistantList from "@/src/components/AssistantList";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import UserChatBox from "./UserChatBox";
import AiChatBox from "./AiChatBox";
import { theme } from "@/src/constants/theme";
import { setAiProfileId } from "@/src/libs/mmkv";
import { ThreadDate } from "@/src/types/threadTypes";
import * as S from "./styles";

interface Props {
  threadDate: ThreadDate;
  expiredDate: Date;
}

function ChattingPage({ threadDate, expiredDate }: Props): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
      setIsVisible(false);
    },
    onError: (error) => console.error(error.response?.data),
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
                key={chat.createAt}
              />
            ) : (
              <UserChatBox input={chat.content} key={chat.createAt} />
            )
          )}
        </S.ScrollBox>
        <S.TextInputBox></S.TextInputBox>
      </S.SafeView>
    </Fragment>
  );
}

export default ChattingPage;
