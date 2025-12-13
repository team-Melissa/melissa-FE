import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { Body2, Description2, Title } from '@/src/core/Txt';
import { IconShared } from '@/src/icons';
import { Image } from 'expo-image';
import styled from 'styled-components/native';
import DiaryCreatedByInfo from '../DiaryCreatedByInfo';

type Props = {
  date: { year: number; month: number; day: number };
  diaryData: Required<DiaryDetailDTO>;
};

const DiaryBottomSheetListItem = ({ date, diaryData }: Props) => {
  return (
    <Wrapper>
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
        <DiaryCreatedByInfo aiProfileId={diaryData.aiProfileId} createdAt={diaryData.createdAt} />
      </RelativeWrapper>
    </Wrapper>
  );
};

export default DiaryBottomSheetListItem;

const Wrapper = styled.View`
  padding: 0 15px 25px 15px;
  gap: 20px;
  border-radius: 40px;
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
