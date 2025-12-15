import { COLOR } from '@/src/constants/theme';
import PlaceholderImage from '@/src/core/PlaceholderImage';
import { Image } from 'expo-image';
import styled from 'styled-components/native';
import type { CalendarDayData } from '../../types';
import HashtagBubble from './HashtagBubble';

type Props = {
  dayData?: CalendarDayData;
};

const CalendarDayContent = ({ dayData }: Props) => {
  const imageUrl = dayData?.diaries.at(0)?.imageUrl;
  const hashtag = dayData?.diaries.at(0)?.hashtag1;

  if (!hashtag) {
    return <EmptyBox />;
  }

  return (
    <ImageBorderWrapper>
      <ImageWrapper>{imageUrl ? <StyledImage source={{ uri: imageUrl }} /> : <PlaceholderImage />}</ImageWrapper>
      <HashtagBubble isVisible={!!dayData?.showBubble} hashtag={hashtag} />
    </ImageBorderWrapper>
  );
};

export default CalendarDayContent;

const EmptyBox = styled.View`
  width: 100%;
  aspect-ratio: 1;
  background-color: #c3e8e0;
  border-radius: 15px;
`;

const ImageBorderWrapper = styled.View`
  padding: 2px;
  background-color: ${COLOR.white};
  border: 2px solid ${COLOR.sub1};
  border-radius: 19px;
`;

const ImageWrapper = styled.View`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  flex: 1;
`;
