import * as S from "./styles";
import { AiProfile } from "@/src/types/aiProfileTypes";
import { Dimensions } from "react-native";
import { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { shadowProps } from "@/src/constants/shadowProps";

interface Props {
  isVisible: boolean;
}

const mockData: AiProfile[] = [
  {
    aiProfileId: 3,
    profileName: "유쾌한 다람쥐",
    imageUrl:
      "https://melissa-s3.s3.ap-northeast-2.amazonaws.com/ai-profile/847ab57f-27aa-4a8b-b3d9-df1d0fe637e7",
    hashTag1: "활발한대화",
    hashTag2: "유머가득",
    feature1: "활발하고 유쾌한 성격",
    feature2: "가벼운 대화 주제 선호",
    feature3: "공감을 잘해주는 스타일",
    createdAt: "2025-01-31T23:40:04.767461",
  },
  {
    aiProfileId: 5,
    profileName: "차분한 토끼",
    imageUrl:
      "https://melissa-s3.s3.ap-northeast-2.amazonaws.com/ai-profile/a59d7969-6ea7-4d5c-b27c-9f2245abd29e",
    hashTag1: "감성토크",
    hashTag2: "마음챙김",
    feature1: "이해심이 깊음",
    feature2: "내면의 이야기를 잘 들어줌",
    feature3: "유머러스한 표현으로 위로",
    createdAt: "2025-02-01T16:25:06.884713",
  },
  {
    aiProfileId: 7,
    profileName: "차분한 부엉이",
    imageUrl:
      "https://melissa-s3.s3.ap-northeast-2.amazonaws.com/ai-profile/6026e9d8-8a28-4055-8481-b6f1c7a5d143",
    hashTag1: "깊이있는대화",
    hashTag2: "이해심",
    feature1: "차분하고 이해심이 많음",
    feature2: "전문적인 주제에 대한 깊이 있는 대화",
    feature3: "유머러스한 표현으로 스트레스 해소",
    createdAt: "2025-02-01T16:30:44.108886",
  },
];

function AssistantList({ isVisible }: Props): JSX.Element | null {
  const [width] = useState<number>(() => Dimensions.get("window").width);

  if (isVisible) {
    return (
      <S.AssistantListLayout>
        <Carousel
          data={mockData}
          width={width}
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 90,
            parallaxAdjacentItemScale: 0.83,
          }}
          pagingEnabled={true}
          snapEnabled={true}
          renderItem={({ item }) => (
            <S.ItemLayout>
              <S.ItemBox>
                <S.ImageBox>
                  <S.Image source={item.imageUrl} contentFit="contain" />
                </S.ImageBox>
                <S.TitleTagBox>
                  <S.Title>{item.profileName}</S.Title>
                  <S.Tag>
                    #{item.hashTag1} #{item.hashTag2}
                  </S.Tag>
                </S.TitleTagBox>
                <S.PersonalityBox>
                  <S.TextBox>
                    <S.PersonalityTitle>성 격</S.PersonalityTitle>
                    <S.PersonalityContent>{item.feature1}</S.PersonalityContent>
                  </S.TextBox>
                  <S.TextBox>
                    <S.PersonalityTitle>성 격</S.PersonalityTitle>
                    <S.PersonalityContent>{item.feature2}</S.PersonalityContent>
                  </S.TextBox>
                  <S.TextBox>
                    <S.PersonalityTitle>성 격</S.PersonalityTitle>
                    <S.PersonalityContent>{item.feature3}</S.PersonalityContent>
                  </S.TextBox>
                </S.PersonalityBox>
                <S.TextBox>
                  <S.CardButton style={shadowProps}>
                    <S.ButtonText>복제하기</S.ButtonText>
                  </S.CardButton>
                  <S.CardButton style={shadowProps}>
                    <S.ButtonText>삭제하기</S.ButtonText>
                  </S.CardButton>
                </S.TextBox>
              </S.ItemBox>
            </S.ItemLayout>
          )}
        />
      </S.AssistantListLayout>
    );
  }

  return null;
}

export default AssistantList;
