import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { Body2, Description2, Description3, Title } from '@/src/core/Txt';
import { IconShared } from '@/src/icons';
import { parseIso8601DateString } from '@/src/utils/date';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

type Props = {
  date: { year: number; month: number; day: number };
  diaryData: Required<DiaryDetailDTO>;
};

const FeedDiaryListItem = ({ date, diaryData }: Props) => {
  const getCreatedAtText = (createdAt: string) => {
    const { year, month, day } = parseIso8601DateString(createdAt);
    return `${year.toString().slice(-2)}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
  };

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
        <CreatedByWrapper>
          <AiProfileImage source={{ uri: diaryData.imageUrl }} />
          <Description3 color="sub1">{getCreatedAtText(diaryData.createdAt)} 다람지와 함께 생성했어요.</Description3>
        </CreatedByWrapper>
      </RelativeWrapper>
    </Wrapper>
  );
};

export default FeedDiaryListItem;

const Wrapper = styled.View`
  flex: 1;
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

const CreatedByWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const AiProfileImage = styled(Image)`
  width: ${responsiveToPx('28px')};
  aspect-ratio: 1;
  border-radius: 12px;
`;
