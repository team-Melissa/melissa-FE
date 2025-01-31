import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { makeAssistantFn } from "@/src/apis/aiProfileApi";
import Button from "@/src/components/ui/Button";
import { fadeIn, fadeOut } from "@/src/libs/animations";
import { AiProfileMakeAnswers, AiProfileMakeResult } from "@/src/types/aiProfileTypes";
import * as S from "./styles";

interface Props {
  answers: string[];
}

function Submit({ answers }: Props) {
  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: () => makeAssistantFn(answersJson),
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => console.error(error.response?.data.message),
  });

  const router = useRouter();
  const [loadingDot, setLoadingDot] = useState<"." | ".." | "...">(".");
  const answersJson = useMemo(
    () =>
      answers.reduce((prev, cur, idx) => {
        prev[`q${idx + 1}` as keyof AiProfileMakeAnswers] = cur;
        return prev;
      }, {} as AiProfileMakeAnswers),
    [answers]
  );

  // mutation 성공 핸들러
  const handleSuccess = (data: AiProfileMakeResult) => {
    console.log(data.message);
    setTimeout(() => {
      router.replace("/(app)/main");
    }, 2500);
  };

  // 초기 mutation 실행
  useEffect(() => {
    mutate();
  }, [mutate]);

  // 로딩 애니메이션 등록
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    intervalId = setInterval(() => {
      setLoadingDot((prev) => {
        if (prev === ".") {
          return "..";
        } else if (prev === "..") {
          return "...";
        } else {
          return ".";
        }
      });
    }, 700);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // mutation 성공
  if (isSuccess && !isPending) {
    return (
      <S.FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
        <S.Image source={require("@/assets/images/checked.svg")} contentFit="contain" />
        <S.InfoText>서포터가 성공적으로 만들어졌어요!</S.InfoText>
        <S.InfoText>하단의 버튼을 통해 대화를 나누어보세요.</S.InfoText>
      </S.FinishAnimatedView>
    );
  }

  // mutation 에러 발생
  if (isError) {
    return (
      <S.FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
        <S.InfoText>서포터 생성 도중 문제가 발생했어요.</S.InfoText>
        <S.InfoText>{error.response?.data.message}</S.InfoText>
        <Button color="white" textColor="black" fontFamily="nsRegular" onPress={() => mutate()}>
          다시 생성하기
        </Button>
      </S.FinishAnimatedView>
    );
  }

  // mutation 중
  return (
    <S.SubmitLayout>
      <S.AnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
        <S.InfoText>서포터를 만들고 있어요</S.InfoText>
        <S.InfoText>잠시만 기다려주세요{loadingDot}</S.InfoText>
      </S.AnimatedView>
    </S.SubmitLayout>
  );
}

export default Submit;
