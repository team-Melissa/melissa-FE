import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMessagesFn } from "@/src/apis/threadApi";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import { ThreadDate } from "@/src/types/threadTypes";
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
    <S.SafeView>
      <S.HeaderBox>
        <S.BackButton onPress={handleBackPress} hitSlop={10}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </S.BackButton>
      </S.HeaderBox>
      <Text>
        {threadDate.day}
        {expiredDate.toString()}
      </Text>
      <TouchableOpacity onPress={handleBackPress}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
    </S.SafeView>
  );
}

export default ChattingPage;
