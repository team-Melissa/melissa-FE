import { TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import useRemoveAssistant from "@/src/hooks/useRemoveAssistant";
import ProfileImage from "./ProfileImage";
import NameTag from "./NameTag";
import Personality from "./Personality";
import CardButton from "./CardButton";
import { AiProfileListWithGenerateAiTrigger } from "@/src/types/aiProfileTypes";
import { preventDoublePress } from "@/src/libs/esToolkit";
import * as S from "./styles";

interface Props {
  item: AiProfileListWithGenerateAiTrigger;
  onPressAiCard: (aiProfileId: number) => void;
}

function AssistantCard({ item, onPressAiCard }: Props) {
  const router = useRouter();
  const { mutate: removeMutate } = useRemoveAssistant();

  const routeMakeAssistantPage = (aiProfileId: number | null = null) => {
    if (!aiProfileId) {
      return preventDoublePress(() => router.push("/(app)/make-assistant"));
    }
    return preventDoublePress(() =>
      router.push(`/(app)/make-assistant?aiProfileId=${aiProfileId}`)
    );
  };

  if ("isGenerateButton" in item) {
    return (
      <S.ItemBox onPress={routeMakeAssistantPage()}>
        <S.PlusImage source={require("@/assets/images/plus.svg")} contentFit="contain" />
        <S.GenAiText>새로운 서포터 추가하기</S.GenAiText>
      </S.ItemBox>
    );
  }

  const { aiProfileId, profileName, imageUrl, hashTag1, hashTag2, feature1, feature2, feature3 } =
    item;

  return (
    <TouchableWithoutFeedback>
      <S.ItemBox onPress={() => onPressAiCard(aiProfileId)}>
        <ProfileImage url={imageUrl} />
        <NameTag name={profileName} tag1={hashTag1} tag2={hashTag2} />
        <Personality feat1={feature1} feat2={feature2} feat3={feature3} />
        <S.ButtonBox>
          <CardButton onPress={routeMakeAssistantPage(aiProfileId)}>복제하기</CardButton>
          <CardButton onPress={() => removeMutate(aiProfileId)}>삭제하기</CardButton>
        </S.ButtonBox>
      </S.ItemBox>
    </TouchableWithoutFeedback>
  );
}

export default AssistantCard;
