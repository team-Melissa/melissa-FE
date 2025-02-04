import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity } from "react-native";
import * as S from "./styles";
import { ThreadDate } from "@/src/types/threadTypes";

interface Props {
  threadDate: ThreadDate;
  expiredDate: Date;
}

function ChattingPage({ threadDate, expiredDate }: Props): JSX.Element {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

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
