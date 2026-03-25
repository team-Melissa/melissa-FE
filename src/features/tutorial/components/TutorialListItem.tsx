import { COLOR } from '@/src/constants/theme';
import { Body2, MiddleTitle } from '@/src/core/Txt';
import { ResizeMode, Video } from 'expo-av';
import { useEffect, useRef } from 'react';
import type { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import styled from 'styled-components/native';
import type { TUTORIAL_LIST_DATA } from '../constants';

type Props = CarouselRenderItemInfo<(typeof TUTORIAL_LIST_DATA)[number]> & {
  isActive: boolean;
};

const TutorialListItem = ({ item, isActive }: Props) => {
  const { title, description, video } = item;
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (!isActive) {
      videoRef.current?.setPositionAsync(0);
    }
  }, [isActive]);

  return (
    <Slide>
      <SlideVideo ref={videoRef} source={video} resizeMode={ResizeMode.CONTAIN} isLooping shouldPlay={isActive} />
      <TextContainer>
        <StyledMiddleTitle color="title">{title}</StyledMiddleTitle>
        <StyledBody2 color="sub1">{description}</StyledBody2>
      </TextContainer>
    </Slide>
  );
};

export default TutorialListItem;

const Slide = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SlideVideo = styled(Video)`
  flex: 1;
  width: 100%;
  height: 90%;
  background-color: ${COLOR.background};
`;

const TextContainer = styled.View`
  padding: 24px 20px;
  align-items: center;
  gap: 8px;
`;

const StyledMiddleTitle = styled(MiddleTitle)`
  text-align: center;
  margin-bottom: 4px;
`;

const StyledBody2 = styled(Body2)`
  text-align: center;
  line-height: 20px;
`;
