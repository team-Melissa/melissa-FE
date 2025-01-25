import { useEffect, useRef, useState } from "react";
import { fadeIn, fadeOut } from "@/src/libs/animations";
import * as S from "./styles";

interface Props {
  answers: string[];
}

function Submit({ answers }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingDot, setLoadingDot] = useState<"." | ".." | "...">(".");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 백엔드 요청이 4초 걸린다고 가정
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (isLoading) {
      intervalRef.current = setInterval(() => {
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
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <S.SubmitLayout>
        <S.AnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
          <S.InfoText>서포터를 만들고 있어요</S.InfoText>
          <S.InfoText>잠시만 기다려주세요{loadingDot}</S.InfoText>
        </S.AnimatedView>
      </S.SubmitLayout>
    );
  }

  return (
    <S.FinishAnimatedView entering={fadeIn(900)} exiting={fadeOut()}>
      <S.Image source={require("@/assets/images/checked.svg")} contentFit="contain" />
      <S.InfoText>서포터가 성공적으로 만들어졌어요!</S.InfoText>
      <S.InfoText>하단의 버튼을 통해 대화를 나누어보세요.</S.InfoText>
    </S.FinishAnimatedView>
  );
}

export default Submit;
