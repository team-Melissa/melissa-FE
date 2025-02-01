import { TouchableWithoutFeedback } from "react-native";
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
  if ("isGenerateButton" in item) {
    // Todo: 어시스턴트 생성 컴포넌트 렌더링
    return <S.ItemBox></S.ItemBox>;
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
