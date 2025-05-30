import { Alert, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { Image as Img } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { preventDoublePress } from "@/src/libs/esToolkit";
import { shadowProps } from "@/src/constants/shadowProps";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { useRemoveAssistantMutation } from "../hooks/mutations/useRemoveAssistantMutation";
import type { TAssistantProfile, TNewAiTrigger } from "../types/assistantListTypes";
import ProfileImage from "./ProfileImage";
import NameTag from "./NameTag";
import Personality from "./Personality";

type AssistantCardProps = {
  item: TAssistantProfile | TNewAiTrigger;
  onPressAiCard: (aiProfileId: number) => void;
};

export default function AssistantCard({ item, onPressAiCard }: AssistantCardProps) {
  const router = useRouter();
  const { mutate: removeMutate } = useRemoveAssistantMutation();

  const confirmDelete = (aiProfileId: number) => {
    Alert.alert("삭제 확인", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "삭제", onPress: () => removeMutate(aiProfileId), style: "destructive" },
    ]);
  };

  const routeMakeAssistantPage = (aiProfileId: number | null = null) => {
    if (!aiProfileId) {
      return preventDoublePress(() => router.push("/(app)/make-assistant"));
    }
    return preventDoublePress(() => router.push(`/(app)/make-assistant?aiProfileId=${aiProfileId}`));
  };

  if ("isGenerateButton" in item) {
    return (
      <ItemBox onPress={routeMakeAssistantPage()}>
        <PlusImage source={require("@/assets/images/plus.svg")} contentFit="contain" />
        <GenAiText>새로운 서포터 만들기</GenAiText>
      </ItemBox>
    );
  }

  const { aiProfileId, profileName, imageUrl, hashTag1, hashTag2, feature1, feature2, feature3 } = item;

  return (
    <TouchableWithoutFeedback>
      <ItemBox onPress={() => onPressAiCard(aiProfileId)} style={shadowProps}>
        {/* Todo: placeholder 이미지로 변경되면, 타입 정리 필요 */}
        <ProfileImage url={imageUrl ?? ""} />
        <NameTagBox>
          <NameTag name={profileName} tag1={hashTag1} tag2={hashTag2} />
          <IconButtonBox>
            <TouchableOpacity onPress={routeMakeAssistantPage(aiProfileId)} style={{ marginRight: 10 }}>
              <Ionicons name="copy-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(aiProfileId)}>
              <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>
          </IconButtonBox>
        </NameTagBox>
        <Personality feat1={feature1} feat2={feature2} feat3={feature3} />
      </ItemBox>
    </TouchableWithoutFeedback>
  );
}

const ItemBox = styled.TouchableOpacity`
  width: ${responsiveToPx("320px")};
  height: ${responsiveToPx("540px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: space-evenly;
  align-items: center;
`;

const NameTagBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px ${responsiveToPx("20px")};
`;

const IconButtonBox = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.sm};
  align-items: center;
`;

const PlusImage = styled(Img)`
  width: ${responsiveToPx("180px")};
  height: ${responsiveToPx("180px")};
`;

const GenAiText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
