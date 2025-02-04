import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { getMessagesFn } from "@/src/apis/threadApi";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import UserChatBox from "./UserChatBox";
import AiChatBox from "./AiChatBox";
import { ThreadDate } from "@/src/types/threadTypes";
import { theme } from "@/src/constants/theme";
import * as S from "./styles";

interface Props {
  threadDate: ThreadDate;
  expiredDate: Date;
}

function ChattingPage({ threadDate, expiredDate }: Props): JSX.Element {
  const router = useRouter();

  const { isPending, isError, data, refetch } = useQuery({
    queryFn: () => getMessagesFn(threadDate),
    queryKey: ["message", threadDate],
  });

  const handleBackPress = () => {
    router.back();
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
    <S.SafeView edges={["left", "right", "top"]}>
      <S.HeaderBox>
        <S.BackButton onPress={handleBackPress} hitSlop={7}>
          <MaterialIcons name="arrow-back-ios" size={28} color={theme.colors.black} />
        </S.BackButton>
        <S.HeaderButton hitSlop={7}>
          <S.Image source={{ uri: data.result.aiProfileImageS3 }} />
          <S.AiNameText>{data.result.aiProfileName}</S.AiNameText>
        </S.HeaderButton>
      </S.HeaderBox>
      <S.ScrollBox>
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
  );
}

export default ChattingPage;
