import { useState, useEffect } from "react";
import { questions } from "../constants/questions";
import Intro from "../components/Intro";
import Question from "../components/Question";
import Submit from "../components/Submit";
import type { TAssistantMakeQnA } from "../types/makeAssistantTypes";
import { useGetIsNewUser } from "@/src/hooks";

type MakeAssistantContainerProps = {
  prevAnswer?: TAssistantMakeQnA & { createdAt: string };
};

export default function MakeAssistantContainer({ prevAnswer }: MakeAssistantContainerProps) {
  const { data: isNewUser } = useGetIsNewUser();
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [cursor, setCursor] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(() => {
    if (prevAnswer) {
      const { createdAt, ...rest } = prevAnswer;
      return Object.values(rest);
    }
    return [];
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isNewUser) {
      timer = setTimeout(() => {
        setIsIntro(false);
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isNewUser]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  if (isNewUser && isIntro) {
    return <Intro />;
  }

  if (cursor + 1 <= questions.length) {
    return <Question answer={answers} setAnswer={setAnswers} cursor={cursor} setCursor={setCursor} />;
  }

  return <Submit answers={answers} />;
}
