import { type Dispatch, type SetStateAction, useState } from "react";
import styled from "styled-components/native";
import Animated, { runOnJS } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { fadeIn, fadeInWithCallback, fadeOut } from "@/src/libs/animations";
import { theme } from "@/src/constants/theme";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { questions } from "../constants/questions";
import QuestionButton from "./QuestionButton";
import ProgressBar from "./ProgressBar";

type QuestionProps = {
  answer: string[];
  setAnswer: Dispatch<SetStateAction<string[]>>;
  cursor: number;
  setCursor: Dispatch<SetStateAction<number>>;
};

export default function Question({ answer, setAnswer, cursor, setCursor }: QuestionProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { skyBlue, deepGreen } = theme.colors;
  const isLeftBtnDisable = cursor === 0;
  const isRightBtnDisable = cursor === questions.length - 1 || cursor >= answer.length;

  const handleNextBtn = () => {
    // 답변하지 않고 다음 페이지로 못 넘어가게 조건 추가
    if (cursor < questions.length - 1 && cursor < answer.length) {
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

    if (cursor < questions.length) {
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
    <BetweenBox>
      <AnimatedHeaderBox entering={fadeIn(900, 300)} exiting={fadeOut()}>
        <HeaderText>
          {cursor + 1}/{questions.length}
        </HeaderText>
        <ProgressBarWrapper>
          <HeaderBtn onPress={handlePrevBtn} disabled={isLeftBtnDisable}>
            <AntDesign name="left" size={24} color={isLeftBtnDisable ? skyBlue : deepGreen} />
          </HeaderBtn>
          <ProgressBar progress={(cursor + 1) / questions.length} />
          <HeaderBtn onPress={handleNextBtn} disabled={isRightBtnDisable}>
            <AntDesign name="right" size={24} color={isRightBtnDisable ? skyBlue : deepGreen} />
          </HeaderBtn>
        </ProgressBarWrapper>
      </AnimatedHeaderBox>
      <AnimatedBodyBox entering={fadeInWithCallback(900, 300, questionEnterCallback)} exiting={fadeOut()} key={cursor}>
        <QuestionBox>
          <QuestionText>{questions[cursor].q}</QuestionText>
        </QuestionBox>
        <ButtonBox>
          {questions[cursor].a.map((text) => (
            <QuestionButton key={text} selected={text === answer[cursor]} onPress={() => handleAnswerBtn(text)}>
              {text}
            </QuestionButton>
          ))}
        </ButtonBox>
      </AnimatedBodyBox>
    </BetweenBox>
  );
}

export const SafeView = styled(SafeAreaView)`
  flex: 1;
`;

export const BetweenBox = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0px 0px ${responsiveToPx("200px")} 0px;
  justify-content: space-between;
  align-items: center;
`;

export const AnimatedHeaderBox = styled(Animated.View)`
  width: 100%;
  height: 17%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${responsiveToPx("60px")};
`;

export const HeaderBtn = styled.TouchableOpacity`
  padding: ${responsiveToPx("14px")};
`;

export const HeaderText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  letter-spacing: ${responsiveToPx("11px")};
  margin-top: ${responsiveToPx("50px")};
`;

export const ProgressBarWrapper = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AnimatedBodyBox = styled(Animated.View)`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionBox = styled.View`
  width: 80%;
  margin-top: ${responsiveToPx("36px")};
`;

export const ButtonBox = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${responsiveToPx("40px")};
`;

export const QuestionText = styled.Text`
  align-self: baseline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${responsiveToPx("40px")};
  padding-bottom: ${responsiveToPx("16px")};
`;
