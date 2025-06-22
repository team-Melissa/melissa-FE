import { useState, useEffect } from "react";
import { questions } from "../constants/questions";
import Question from "../components/Question";
import Submit from "../components/Submit";
import type { TAssistantMakeQnA } from "../types/makeAssistantTypes";

type MakeAssistantContainerProps = {
  prevAnswer?: TAssistantMakeQnA & { createdAt: string };
};

export default function MakeAssistantContainer({ prevAnswer }: MakeAssistantContainerProps) {
  const [cursor, setCursor] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(() => {
    if (prevAnswer) {
      const { createdAt, ...rest } = prevAnswer;
      return Object.values(rest);
    }
    return [];
  });

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  if (cursor + 1 <= questions.length) {
    return <Question answer={answers} setAnswer={setAnswers} cursor={cursor} setCursor={setCursor} />;
  }

  return <Submit answers={answers} />;
}
