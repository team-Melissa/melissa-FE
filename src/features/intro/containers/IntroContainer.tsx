import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { GoToNextButton } from "../components/GoToNextButton";
import { theme } from "@/src/constants/theme";
import { IntroContent } from "../components/IntroContent";
import { useState } from "react";

type Texts = {
  top: string;
  middle: string;
  bottom: string;
};

export const IntroContainer = () => {
  const [isVisibleBtn, setIsVisibleBtn] = useState<boolean>(false);
  const [txt, setTxt] = useState<Texts>({
    top: "안녕하세요!",
    middle: "당신의 따뜻한 하루를 함께할 서포터 멜리사입니다.",
    bottom: "지친 하루, 일기 쓰기조차 번거롭지 않으신가요?",
  });

  const handleClick = () => {
    if (isVisibleBtn) return;
    setTimeout(() => {
      setTxt({
        top: "그렇다면, 오늘 어떤 일이 있었는지 제게 말해주세요.",
        middle: "당신의 이야기를 귀 기울여 듣고,",
        bottom: "당신만을 위한 이야기를 정성스레 써드릴게요.",
      });
    }, 0);
    setIsVisibleBtn(true);
  };

  return (
    <SafeWrapper>
      <PressableWrapper onPress={handleClick}>
        <IntroContent>
          <StyledText>{txt.top}</StyledText>
          <StyledText>{txt.middle}</StyledText>
          <StyledText>{txt.bottom}</StyledText>
        </IntroContent>
        {isVisibleBtn && <GoToNextButton />}
      </PressableWrapper>
    </SafeWrapper>
  );
};

const SafeWrapper = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
`;

const PressableWrapper = styled.Pressable`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: ${theme.colors.textGray};
  line-height: 30px;
  font-size: 16px;
`;
