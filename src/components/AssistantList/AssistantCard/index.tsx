import { TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useRemoveAssistant from "@/src/hooks/useRemoveAssistant";
import ProfileImage from "./ProfileImage";
import NameTag from "./NameTag";
import Personality from "./Personality";
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
        <S.GenAiText>새로운 서포터 만들기</S.GenAiText>
      </S.ItemBox>
    );
  }

  const { aiProfileId, profileName, imageUrl, hashTag1, hashTag2, feature1, feature2, feature3 } =
    item;

  return (
    <TouchableWithoutFeedback>
      <S.ItemBox onPress={() => onPressAiCard(aiProfileId)}>
        <ProfileImage url={imageUrl} />

        {/* 이름과 아이콘 버튼을 한 줄로 정렬 */}
        <S.NameTagContainer>
          <NameTag name={profileName} tag1={hashTag1} tag2={hashTag2} />
          <S.IconButtonBox>
            <TouchableOpacity onPress={routeMakeAssistantPage(aiProfileId)} style={{ marginRight: 10 }}>
              <Ionicons name="copy-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeMutate(aiProfileId)}>
              <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>
          </S.IconButtonBox>
        </S.NameTagContainer>

        <Personality feat1={feature1} feat2={feature2} feat3={feature3} />
      </S.ItemBox>
    </TouchableWithoutFeedback>
  );
}

export default AssistantCard;