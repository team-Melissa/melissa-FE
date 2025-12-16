import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import PlaceholderImage from '@/src/core/PlaceholderImage';
import { Body1, ShareTag, ShareTitle } from '@/src/core/Txt';
import { IconMelissa } from '@/src/icons';
import characters from '@/src/modules/character';
import { Image } from 'expo-image';
import styled from 'styled-components/native';
import type { TDate } from '../../types';

type Props = {
  date: TDate;
  diaryData: Required<DiaryDetailDTO>;
};

const ShareDiaryThumbnail = ({ date, diaryData }: Props) => {
  const character = characters[diaryData.aiProfileId as keyof typeof characters];
  if (!character) return null;

  const { bust: Bust } = character;

  return (
    <Wrapper>
      {diaryData.imageUrl ? <StyledImage source={{ uri: diaryData.imageUrl }} /> : <PlaceholderImage />}
      <Overlay />
      <InfoWrapper>
        <Bust style={{ position: 'absolute', top: 15, left: 15 }} />
        <IconMelissa style={{ position: 'absolute', top: 15, right: 15 }} />
        <Body1 color="white">
          {date.year}년 {date.month}월 {date.day}일
        </Body1>
        <ShareTitle color="white">{diaryData.title}</ShareTitle>
        <HashtagTxt color="white">
          #{diaryData.hashtag1} #{diaryData.hashtag2}
        </HashtagTxt>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ShareDiaryThumbnail;

const Wrapper = styled.View`
  flex: 1;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
`;

const Overlay = styled.View`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoWrapper = styled.View`
  position: absolute;
  width: 100%;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`;

const HashtagTxt = styled(ShareTag)`
  position: absolute;
  bottom: 20px;
`;
