import { useState, useEffect } from "react";
import question from "@/src/constants/question";
import Intro from "./Intro";
import Question from "./Question";
import Submit from "./Submit";

function MakeAssistantPage() {
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  if (isIntro) {
    return <Intro />;
  }

  if (answers.length < question.length) {
    return <Question answer={answers} setAnswer={setAnswers} />;
  }

  return <Submit answers={answers} />;
}

export default MakeAssistantPage;
