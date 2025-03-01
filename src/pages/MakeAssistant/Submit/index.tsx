import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import { makeAssistantFn } from "@/src/apis/aiProfileApi";
import Button from "@/src/components/ui/Button";
import { fadeIn, fadeOut } from "@/src/libs/animations";
import { setAiProfileId } from "@/src/libs/mmkv";
import { AiProfileMakeAnswers, AiProfileMakeResult } from "@/src/types/aiProfileTypes";
import * as S from "./styles";

interface Props {
  answers: string[];
}

function Submit({ answers }: Props) {
  const queryClient = useQueryClient();
  const isNewUser = useIsNewUserContext();
  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: () => makeAssistantFn(answersJson),
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => console.error(error.response?.data),
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
    if (isNewUser) {
      console.log("새로운 유저입니다. mmkv에 생성된 어시스턴트 id를 저장합니다...");
      setAiProfileId(data.result.aiProfileId);
      setTimeout(() => {
        console.log("/main으로 리다이렉트합니다.");
        router.replace("/(app)/main");
      }, 2500);
    } else {
      console.log("기존 유저입니다. mmkv를 그대로 둡니다...");
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      setTimeout(() => {
        console.log("이전 페이지로 back 합니다.");
        router.back();
      }, 2500);
    }
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
      <S.SubmitLayout>
        <S.FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
          <S.Image source={require("@/assets/images/checked.svg")} contentFit="contain" />
          <S.InfoText>서포터가 성공적으로 만들어졌어요!</S.InfoText>
          <S.InfoText>하단의 버튼을 통해 대화를 나누어보세요.</S.InfoText>
        </S.FinishAnimatedView>
      </S.SubmitLayout>
    );
  }

  // mutation 에러 발생
  if (isError) {
    return (
      <S.SubmitLayout>
        <S.FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
          <S.InfoText>서포터 생성 도중 문제가 발생했어요.</S.InfoText>
          <S.InfoText>{error.response?.data.message}</S.InfoText>
          <Button color="white" textColor="black" fontFamily="nsRegular" onPress={() => mutate()}>
            다시 생성하기
          </Button>
        </S.FinishAnimatedView>
      </S.SubmitLayout>
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
