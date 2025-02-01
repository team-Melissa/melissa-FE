import { TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import ProfileImage from "./ProfileImage";
import NameTag from "./NameTag";
import Personality from "./Personality";
import CardButton from "./CardButton";
import { AiProfileListWithGenerateAiTrigger } from "@/src/types/aiProfileTypes";
import * as S from "./styles";

interface Props {
  item: AiProfileListWithGenerateAiTrigger;
}

function AssistantCard({ item }: Props) {
  const router = useRouter();

  const routeMakeAssistantPage = () => {
    router.push("/(app)/make-assistant");
  };

  if ("isGenerateButton" in item) {
    return (
      <S.ItemBox onPress={routeMakeAssistantPage}>
        <S.PlusImage source={require("@/assets/images/plus.svg")} />
        <S.GenAiText>새로운 서포터 추가하기</S.GenAiText>
      </S.ItemBox>
    );
  }

  const { profileName, imageUrl, hashTag1, hashTag2, feature1, feature2, feature3 } = item;

  // Todo: 복제/삭제/선택 로직 구현

  return (
    <TouchableWithoutFeedback>
      <S.ItemBox>
        <ProfileImage url={imageUrl} />
        <NameTag name={profileName} tag1={hashTag1} tag2={hashTag2} />
        <Personality feat1={feature1} feat2={feature2} feat3={feature3} />
        <S.ButtonBox>
          <CardButton onPress={() => {}}>복제하기</CardButton>
          <CardButton onPress={() => {}}>삭제하기</CardButton>
        </S.ButtonBox>
      </S.ItemBox>
    </TouchableWithoutFeedback>
  );
}

export default AssistantCard;
