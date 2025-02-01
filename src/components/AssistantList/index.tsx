import { useSharedValue } from "react-native-reanimated";
import * as S from "./styles";
import { AiProfile } from "@/src/types/aiProfileTypes";
import { Dimensions, Text, View } from "react-native";
import { useState } from "react";
import Carousel from "react-native-reanimated-carousel";

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
    aiProfileId: 4,
    profileName: "유쾌한1 다람쥐",
    imageUrl:
      "https://melissa-s3.s3.ap-northeast-2.amazonaws.com/ai-profile/847ab57f-27aa-4a8b-b3d9-df1d0fe637e7",
    hashTag1: "활발한1대화",
    hashTag2: "유머가1득",
    feature1: "활발하1고 유쾌한 성격",
    feature2: "가벼운 1대화 주제 선호",
    feature3: "공감을 1잘해주는 스타일",
    createdAt: "2025-01-31T23:40:04.767461",
  },
  {
    aiProfileId: 5,
    profileName: "유쾌한2 다람쥐",
    imageUrl:
      "https://melissa-s3.s3.ap-northeast-2.amazonaws.com/ai-profile/847ab57f-27aa-4a8b-b3d9-df1d0fe637e7",
    hashTag1: "활발한2대화",
    hashTag2: "유머가2득",
    feature1: "활발하2고 유쾌한 성격",
    feature2: "가벼운 2대화 주제 선호",
    feature3: "공감을 2잘해주는 스타일",
    createdAt: "2025-01-31T23:40:04.767461",
  },
];

function AssistantList({ isVisible }: Props): JSX.Element | null {
  const [width] = useState<number>(() => Dimensions.get("window").width);
  const progress = useSharedValue<number>(0);

  if (isVisible) {
    return (
      <S.AssistantListLayout>
        <Carousel
          data={mockData}
          width={width}
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          pagingEnabled={true}
          snapEnabled={true}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View>
              <Text>{item.profileName}</Text>
            </View>
          )}
        />
      </S.AssistantListLayout>
    );
  }

  return null;
}

export default AssistantList;
