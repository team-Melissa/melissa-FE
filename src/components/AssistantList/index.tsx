import { Dispatch, SetStateAction, useState } from "react";
import { ActivityIndicator, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-native-reanimated-carousel";
import { assistantListFn } from "@/src/apis/aiProfileApi";
import Button from "@/src/components/ui/Button";
import AssistantCard from "./AssistantCard";
import * as S from "./styles";

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onPressAiCard: (aiProfileId: number) => void;
}

function AssistantList({ isVisible, setIsVisible, onPressAiCard }: Props): JSX.Element | null {
  const [width] = useState<number>(() => Dimensions.get("window").width);

  const { isPending, isError, error, data, refetch } = useQuery({
    queryFn: assistantListFn,
    queryKey: ["assistant-list"],
    enabled: isVisible,
  });

  const handleOuterClick = () => {
    setIsVisible(false);
  };

  if (isVisible) {
    if (isPending) {
      return (
        <S.AssistantListLayout onPress={handleOuterClick}>
          <S.ItemLayout>
            <ActivityIndicator size="large" />
          </S.ItemLayout>
        </S.AssistantListLayout>
      );
    }

    if (isError) {
      return (
        <S.AssistantListLayout onPress={handleOuterClick}>
          <S.ItemLayout>
            <TouchableWithoutFeedback>
              <S.ItemBox>
                <S.InfoText>Ai 목록을 불러오던 중 오류가 발생했어요.</S.InfoText>
                <S.InfoText>{error.response?.data.message}</S.InfoText>
                <Button onPress={() => refetch()} color="skyBlue" textColor="black">
                  다시 시도하기
                </Button>
              </S.ItemBox>
            </TouchableWithoutFeedback>
          </S.ItemLayout>
        </S.AssistantListLayout>
      );
    }

    return (
      <S.AssistantListLayout onPress={handleOuterClick}>
        <Carousel
          data={data}
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
              <AssistantCard item={item} onPressAiCard={onPressAiCard} />
            </S.ItemLayout>
          )}
        />
      </S.AssistantListLayout>
    );
  }

  return null;
}

export default AssistantList;
