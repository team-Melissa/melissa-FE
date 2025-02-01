import { useState, useEffect } from "react";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import question from "@/src/constants/question";
import Intro from "./Intro";
import Question from "./Question";
import Submit from "./Submit";
import { AiProfileMakeAnswers } from "@/src/types/aiProfileTypes";

interface Props {
  prevAnswer?: AiProfileMakeAnswers & { createdAt: string };
}

function MakeAssistantPage({ prevAnswer }: Props) {
  const isNewUser = useIsNewUserContext();
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

  if (cursor + 1 <= question.length) {
    return (
      <Question answer={answers} setAnswer={setAnswers} cursor={cursor} setCursor={setCursor} />
    );
  }

  return <Submit answers={answers} />;
}

export default MakeAssistantPage;
