import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { GoToNextButton } from "../components/GoToNextButton";
import { theme } from "@/src/constants/theme";
import { IntroContent } from "../components/IntroContent";
import { useCallback, useEffect, useState } from "react";
import { INTRO_TEXT, INTRO_TIMER } from "../constants";

type Texts = {
  top: string;
  middle: string;
  bottom: string;
};

export const IntroContainer = () => {
  const [isVisibleBtn, setIsVisibleBtn] = useState<boolean>(false);
  const [txt, setTxt] = useState<Texts>(INTRO_TEXT.before);

  const handleViewChange = useCallback(() => {
    if (isVisibleBtn) return;
    setTimeout(() => {
      setTxt(INTRO_TEXT.after);
    }, 0);
    setIsVisibleBtn(true);
  }, [isVisibleBtn]);

  const handleClick = () => {
    if (isVisibleBtn) return;
    handleViewChange();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleViewChange();
    }, INTRO_TIMER);

    return () => clearTimeout(timer);
  }, [handleViewChange]);

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
