import { useEffect } from "react";
import { Image as Img } from "expo-image";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/src/components/ui/Button";
import { fadeIn, fadeOut } from "@/src/libs/animations";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { useMakeAssistantMutation } from "../hooks/mutations/useMakeAssistantMutation";
import { useLoadingDotAnimation } from "../hooks/useLoadingDotAnimation";

type SubmitProps = {
  answers: string[];
};

export default function Submit({ answers }: SubmitProps) {
  const { isPending, isSuccess, isError, error, mutate } = useMakeAssistantMutation({ answers });
  const loadingDot = useLoadingDotAnimation();

  // mutation 실행
  useEffect(() => {
    mutate();
  }, [mutate]);

  // mutation 성공
  if (isSuccess && !isPending) {
    return (
      <SubmitLayout>
        <FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
          <Image source={require("@/assets/images/checked.svg")} contentFit="contain" />
          <InfoText>서포터가 성공적으로 만들어졌어요!</InfoText>
          <InfoText>하단의 버튼을 통해 대화를 나누어보세요.</InfoText>
        </FinishAnimatedView>
      </SubmitLayout>
    );
  }

  // mutation 에러 발생
  if (isError) {
    return (
      <SubmitLayout>
        <FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
          <InfoText>서포터 생성 도중 문제가 발생했어요.</InfoText>
          <InfoText>{error.response?.data.message}</InfoText>
          <Button color="white" textColor="black" fontFamily="nsRegular" onPress={() => mutate()}>
            다시 생성하기
          </Button>
        </FinishAnimatedView>
      </SubmitLayout>
    );
  }

  // mutation 중
  return (
    <SubmitLayout>
      <AnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
        <InfoText>서포터를 만들고 있어요</InfoText>
        <InfoText>잠시만 기다려주세요{loadingDot}</InfoText>
      </AnimatedView>
    </SubmitLayout>
  );
}

const SubmitLayout = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
`;

const AnimatedView = styled(Animated.View)`
  justify-content: center;
  align-items: start;
`;

const FinishAnimatedView = styled(AnimatedView)`
  flex: 1;
  align-items: center;
`;

const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding-bottom: ${responsiveToPx("30px")};
`;

const Image = styled(Img)`
  width: ${responsiveToPx("130px")};
  height: ${responsiveToPx("130px")};
  margin-bottom: ${responsiveToPx("30px")};
`;
