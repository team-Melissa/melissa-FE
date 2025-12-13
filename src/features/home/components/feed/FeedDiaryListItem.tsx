import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { Body2, Description2, Title } from '@/src/core/Txt';
import { IconShared } from '@/src/icons';
import { Image } from 'expo-image';
import type { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import FeedCreatedBy from './FeedCreatedBy';

type Props = {
  date: { year: number; month: number; day: number };
  diaryData: Required<DiaryDetailDTO>;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const FeedDiaryListItem = ({ date, diaryData, onLayout }: Props) => {
  return (
    <Wrapper onLayout={onLayout}>
      <StyledImage source={{ uri: diaryData.imageUrl }} />
      <RelativeWrapper>
        <ShareButton hitSlop={5}>
          <IconShared />
        </ShareButton>
        <StyledDateTxt color="title">
          {date.year}년 {date.month}월 {date.day}일
        </StyledDateTxt>
        <StyledTitleTxt color="title">{diaryData.title}</StyledTitleTxt>
        <StyledContentTxt color="sub1">{diaryData.content}</StyledContentTxt>
        <StyledHashtagTxt color="main">
          #{diaryData.hashtag1} #{diaryData.hashtag2}
        </StyledHashtagTxt>
        <FeedCreatedBy aiProfileId={diaryData.aiProfileId} createdAt={diaryData.createdAt} />
      </RelativeWrapper>
    </Wrapper>
  );
};

export default FeedDiaryListItem;

const Wrapper = styled.View`
  width: 100%;
  padding: 15px 15px 25px 15px;
  margin-bottom: 30px;
  gap: 20px;
  border-radius: 40px;
  background-color: ${COLOR.white};
`;

const StyledImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 25px;
`;

const RelativeWrapper = styled.View`
  position: relative;
`;

const ShareButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledDateTxt = styled(Description2)`
  line-height: 18px;
`;

const StyledTitleTxt = styled(Title)`
  line-height: 21px;
  margin-bottom: 10px;
`;

const StyledContentTxt = styled(Body2)`
  margin-bottom: 5px;
  line-height: 20px;
`;

const StyledHashtagTxt = styled(Body2)`
  margin-bottom: 32px;
  line-height: 20px;
`;
