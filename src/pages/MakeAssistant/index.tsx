import { useState, useEffect } from "react";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import question from "@/src/constants/question";
import Intro from "./Intro";
import Question from "./Question";
import Submit from "./Submit";

function MakeAssistantPage() {
  const isNewUser = useIsNewUserContext();
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [answers, setAnswers] = useState<string[]>([]);

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

  if (answers.length < question.length) {
    return <Question answer={answers} setAnswer={setAnswers} />;
  }

  return <Submit answers={answers} />;
}

export default MakeAssistantPage;
