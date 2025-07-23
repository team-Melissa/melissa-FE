import { useState, useEffect } from "react";
import { questions } from "../constants/questions";
import Intro from "../components/Intro";
import Question from "../components/Question";
import Submit from "../components/Submit";
import type { TAssistantMakeQnA } from "../types/makeAssistantTypes";

type MakeAssistantContainerProps = {
  prevAnswer?: TAssistantMakeQnA & { createdAt: string };
};

export default function MakeAssistantContainer({ prevAnswer }: MakeAssistantContainerProps) {
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
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isIntro) return <Intro />;

  if (cursor + 1 <= questions.length) {
    return <Question answer={answers} setAnswer={setAnswers} cursor={cursor} setCursor={setCursor} />;
  }

  return <Submit answers={answers} />;
}
