import { COLOR } from '@/src/constants/theme';
import { Body2, MiddleTitle } from '@/src/core/Txt';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEffect } from 'react';
import type { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import styled from 'styled-components/native';
import type { TUTORIAL_LIST_DATA } from '../constants';

type Props = CarouselRenderItemInfo<(typeof TUTORIAL_LIST_DATA)[number]> & {
  isActive: boolean;
};

const TutorialListItem = ({ item, isActive }: Props) => {
  const { title, description, video } = item;

  const videoPlayer = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
  });

  useEffect(() => {
    if (isActive) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  }, [videoPlayer, isActive]);

  return (
    <Slide>
      <SlideVideo player={videoPlayer} contentFit="contain" nativeControls={false} />
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
  background-color: ${COLOR.background};
`;

const SlideVideo = styled(VideoView)`
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
