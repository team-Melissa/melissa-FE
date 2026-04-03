import { COLOR } from '@/src/constants/theme';
import { setIsTutorialFinished } from '@/src/libs/mmkv';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import NextButton from '../components/NextButton';
import PrevButton from '../components/PrevButton';
import TutorialList from '../components/TutorialList';
import TutorialSkipButton from '../components/TutorialSkipButton';
import { TUTORIAL_LIST_DATA } from '../constants';

const TutorialContainer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const router = useRouter();

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === TUTORIAL_LIST_DATA.length - 1;

  const handleTutorialFinish = () => {
    setIsTutorialFinished(true);
    router.replace('/(app)');
  };

  const handlePrevClick = () => {
    if (isFirstPage) return;
    carouselRef.current?.prev();
  };

  const handleNextClick = () => {
    if (isLastPage) {
      handleTutorialFinish();
      return;
    }
    carouselRef.current?.next();
  };

  return (
    <Container>
      <SkipButtonWrapper>
        <TutorialSkipButton onClick={handleTutorialFinish}>건너뛰기</TutorialSkipButton>
      </SkipButtonWrapper>
      <TutorialList ref={carouselRef} onIndexChange={setCurrentIndex} />
      <NavButtonWrapper>
        {!isFirstPage && <PrevButton onClick={handlePrevClick}>이전</PrevButton>}
        <NextButton onClick={handleNextClick}>{isLastPage ? '시작하기' : '다음'}</NextButton>
      </NavButtonWrapper>
    </Container>
  );
};

export default TutorialContainer;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;

const SkipButtonWrapper = styled.View`
  padding: 16px 20px;
  align-items: flex-end;
`;

const NavButtonWrapper = styled.View`
  flex-direction: row;
  padding: 20px;
  gap: 12px;
`;
