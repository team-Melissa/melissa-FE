import { useState, type Dispatch, type SetStateAction } from "react";
import { ActivityIndicator, Dimensions, TouchableWithoutFeedback } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import styled from "styled-components/native";
import Button from "@/src/components/ui/Button";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { useAssistantListQuery } from "../hooks/queries/useAssistantListQuery";
import AssistantCard from "../components/AssistantCard";

type AssistantListContainerProps = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onPressAiCard: (aiProfileId: number) => void;
};

export default function AssistantListContainer({
  isVisible,
  setIsVisible,
  onPressAiCard,
}: AssistantListContainerProps) {
  const [width] = useState<number>(() => Dimensions.get("window").width);
  const { isPending, isError, error, data, refetch } = useAssistantListQuery();

  const handleOuterClick = () => {
    setIsVisible(false);
  };

  if (isVisible) {
    if (isPending) {
      return (
        <AssistantListLayout onPress={handleOuterClick}>
          <ItemLayout>
            <ActivityIndicator size="large" />
          </ItemLayout>
        </AssistantListLayout>
      );
    }

    if (isError) {
      return (
        <AssistantListLayout onPress={handleOuterClick}>
          <ItemLayout>
            <TouchableWithoutFeedback>
              <ItemBox>
                <InfoText>Ai 목록을 불러오던 중 오류가 발생했어요.</InfoText>
                <InfoText>{error.response?.data.message}</InfoText>
                <Button onPress={() => refetch()} color="skyBlue" textColor="black">
                  다시 시도하기
                </Button>
              </ItemBox>
            </TouchableWithoutFeedback>
          </ItemLayout>
        </AssistantListLayout>
      );
    }

    return (
      <AssistantListLayout onPress={handleOuterClick}>
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
            <ItemLayout>
              <AssistantCard item={item} onPressAiCard={onPressAiCard} />
            </ItemLayout>
          )}
        />
      </AssistantListLayout>
    );
  }

  return null;
}

export const AssistantListLayout = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const ItemLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ItemBox = styled.TouchableOpacity`
  width: ${responsiveToPx("320px")};
  height: ${responsiveToPx("540px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: space-evenly;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.black};
`;
