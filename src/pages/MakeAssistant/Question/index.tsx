import { Dispatch, SetStateAction, useState } from "react";
import { runOnJS } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProgressBar from "@/src/components/ProgressBar";
import Button from "@/src/components/ui/Button";
import { fadeIn, fadeInWithCallback, fadeOut } from "@/src/libs/animations";
import question from "@/src/constants/question";
import { theme } from "@/src/constants/theme";
import * as S from "./styles";

interface Props {
  answer: string[];
  setAnswer: Dispatch<SetStateAction<string[]>>;
}

function Question({ answer, setAnswer }: Props) {
  const [cursor, setCursor] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const { gray, black } = theme.colors;
  const leftBtnColor = cursor === 0 ? gray : black;
  const rightBtnColor = cursor === question.length - 1 || cursor >= answer.length ? gray : black;

  const handleNextBtn = () => {
    // 답변하지 않고 다음 페이지로 못 넘어가게 조건 추가
    if (cursor < question.length - 1 && cursor < answer.length) {
      setCursor(cursor + 1);
      setIsAnimating(true);
    }
  };

  const handlePrevBtn = () => {
    if (cursor > 0) {
      setCursor(cursor - 1);
      setIsAnimating(true);
    }
  };

  const handleAnswerBtn = (text: string) => {
    // 애니메이션 도중에는 버튼 눌리지 않게 조건 추가
    if (isAnimating) return;

    // 기존 answer 변경인지 새로 추가인지 조건 분기
    if (cursor === answer.length) {
      setAnswer((prev) => [...prev, text]);
    } else {
      setAnswer((prev) => prev.map((e, i) => (i === cursor ? text : e)));
    }

    if (cursor < question.length - 1) {
      setCursor(cursor + 1);
      setIsAnimating(true);
    }
  };

  // fadeIn 애니메이션 실행 뒤 콜백 함수
  const questionEnterCallback = (finished: boolean) => {
    "worklet";
    if (finished) runOnJS(setIsAnimating)(false);
  };

  return (
    <S.BetweenBox>
      <S.AnimatedHeaderBox entering={fadeIn(900, 300)} exiting={fadeOut()}>
        {/* Todo: 버튼 클릭 시 색 변하게 하기*/}
        <S.HeaderText>
          {cursor + 1}/{question.length}
        </S.HeaderText>
        <S.ProgressBarWrapper>
          <AntDesign name="left" size={24} color={leftBtnColor} onPress={handlePrevBtn} />
          <ProgressBar progress={(cursor + 1) / question.length} />
          <AntDesign name="right" size={24} color={rightBtnColor} onPress={handleNextBtn} />
        </S.ProgressBarWrapper>
      </S.AnimatedHeaderBox>
      <S.AnimatedBodyBox
        entering={fadeInWithCallback(900, 300, questionEnterCallback)}
        exiting={fadeOut()}
        key={cursor}
      >
        <S.QuestionBox>
          <S.QuestionText>{question[cursor].q}</S.QuestionText>
        </S.QuestionBox>
        <S.ButtonBox>
          {question[cursor].a.map((text) => (
            <Button
              key={text}
              color="white"
              textColor="black"
              fontFamily="nsRegular"
              onPress={() => handleAnswerBtn(text)}
            >
              {text}
            </Button>
          ))}
        </S.ButtonBox>
      </S.AnimatedBodyBox>
    </S.BetweenBox>
  );
}

export default Question;
