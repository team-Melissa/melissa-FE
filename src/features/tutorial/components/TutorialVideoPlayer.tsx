import { COLOR } from '@/src/constants/theme';
import { useVideoPlayer, VideoView, type VideoSource } from 'expo-video';
import { useEffect } from 'react';
import styled from 'styled-components/native';

type Props = {
  source: VideoSource;
};

const TutorialVideoPlayer = ({ source }: Props) => {
  console.log('[TutorialVideoPlayer] render, source:', source);

  const videoPlayer = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = true;
    player.bufferOptions = {
      preferredForwardBufferDuration: 0,
    };
  });

  useEffect(() => {
    videoPlayer.play();

    return () => {
      videoPlayer.release();
    };
  }, [videoPlayer]);

  return <SlideVideo player={videoPlayer} contentFit="contain" nativeControls={false} />;
};

export default TutorialVideoPlayer;

const SlideVideo = styled(VideoView)`
  flex: 1;
  width: 100%;
  height: 90%;
  background-color: ${COLOR.background};
`;
