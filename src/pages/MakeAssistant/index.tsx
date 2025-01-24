import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/src/components/ui/Button";
import question from "@/src/constants/question";
import * as S from "./styles";

import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

function MakeAssistantPage() {
  const [isStart, setIsStart] = useState<boolean>(true);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStart(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  if (isStart) {
    return <Start />;
  }

  if (answers.length < question.length) {
    return <Question answer={answers} setAnswer={setAnswers} />;
  }

  return null;
}

function Start() {
  return (
    <S.SafeLayout>
      <S.CenteringBox>
        <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut.duration(300)}>
          <S.InfoText>
            몇 가지 <S.Bold>질문</S.Bold>에 답변해주세요
          </S.InfoText>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(1500).duration(1000)} exiting={FadeOut.duration(300)}>
          <S.InfoText>
            당신에게 맞는 <S.Bold>서포터</S.Bold>를 만들어드릴게요
          </S.InfoText>
        </Animated.View>
      </S.CenteringBox>
    </S.SafeLayout>
  );
}

function Question({
  answer,
  setAnswer,
}: {
  answer: string[];
  setAnswer: Dispatch<SetStateAction<string[]>>;
}) {
  const [cursor, setCursor] = useState<number>(0);

  const handleNextBtn = () => {
    // 답변하지 않고 다음 페이지로 못 넘어가게 조건 추가
    if (cursor < question.length - 1 && cursor < answer.length) setCursor(cursor + 1);
  };

  const handlePrevBtn = () => {
    if (cursor > 0) setCursor(cursor - 1);
  };

  const handleBtnPress = (text: string) => {
    // 기존 answer 변경인지 새로 추가인지 조건 분기
    if (cursor === answer.length) {
      setAnswer((prev) => [...prev, text]);
    } else {
      // setAnswer((prev) => [...prev].splice(cursor, 1, text));
      setAnswer((prev) => prev.map((e, i) => (i === cursor ? text : e)));
    }

    if (cursor < question.length - 1) setCursor(cursor + 1);
  };

  return (
    <S.SafeLayout>
      <S.BetweenBox>
        <S.AnimatedHeaderBox
          entering={FadeIn.delay(900).duration(300)}
          exiting={FadeOut.duration(300)}
        >
          {/* Todo: 버튼 클릭 시 색 변하게 하기*/}
          {/* Todo: 거대 컴포넌트들 쪼개기 */}
          <S.HeaderText>
            {cursor + 1}/{question.length}
          </S.HeaderText>
          <S.ProgressBarWrapper>
            <AntDesign
              name="left"
              size={24}
              color={cursor === 0 ? "gray" : "black"}
              onPress={handlePrevBtn}
            />
            <ProgressBar progress={(cursor + 1) / question.length} />
            <AntDesign
              name="right"
              size={24}
              color={cursor === question.length - 1 || cursor >= answer.length ? "gray" : "black"}
              onPress={handleNextBtn}
            />
          </S.ProgressBarWrapper>
        </S.AnimatedHeaderBox>

        <S.AnimatedBodyBox
          entering={FadeIn.delay(900).duration(300)}
          exiting={FadeOut.duration(300)}
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
                onPress={() => handleBtnPress(text)}
              >
                {text}
              </Button>
            ))}
          </S.ButtonBox>
        </S.AnimatedBodyBox>
      </S.BetweenBox>
    </S.SafeLayout>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 300 });
  }, [animatedProgress, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <S.ProgressBarBox>
      <S.AnimatedProgressBar style={animatedStyle} />
    </S.ProgressBarBox>
  );
}

export default MakeAssistantPage;
