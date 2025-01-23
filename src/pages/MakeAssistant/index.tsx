import { useEffect, useState } from "react";
import Button from "@/src/components/ui/Button";
import question from "@/src/constants/question";
import * as S from "./styles";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "react-native";

function MakeAssistantPage() {
  const [isStart, setIsStart] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStart(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return <S.SafeLayout>{isStart ? <Start /> : <Question />}</S.SafeLayout>;
}

function Start() {
  return (
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
  );
}

function Question() {
  const [cursor, setCursor] = useState<number>(0);

  const handleNextBtn = () => {
    if (cursor < question.length - 1) setCursor(cursor + 1);
  };

  const handlePrevBtn = () => {
    if (cursor > 0) setCursor(cursor - 1);
  };

  return (
    <S.BetweenBox>
      <S.HeaderBox>
        {/* Todo: 진행상황 바 만들기, 버튼 클릭 시 색 변하게 하기*/}
        <Text>
          {cursor + 1} / {question.length}
        </Text>
        <S.ProgressBarBox>
          <AntDesign name="left" size={24} color="black" onPress={handlePrevBtn} />

          <AntDesign name="right" size={24} color="black" onPress={handleNextBtn} />
        </S.ProgressBarBox>
      </S.HeaderBox>

      <S.AnimatedBodyBox
        entering={FadeIn.delay(900).duration(300)}
        exiting={FadeOut.duration(300)}
        key={cursor} // cursor가 바뀔 때마다 새로운 뷰로 인식
      >
        <S.QuestionBox>
          <S.QuestionText>{question[cursor].q}</S.QuestionText>
        </S.QuestionBox>

        <S.ButtonBox>
          {question[cursor].a.map((e, i) => (
            <Button key={e} color="white" textColor="black">
              {e}
            </Button>
          ))}
        </S.ButtonBox>
      </S.AnimatedBodyBox>
    </S.BetweenBox>
  );
}

export default MakeAssistantPage;
