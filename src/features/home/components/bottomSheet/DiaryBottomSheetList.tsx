import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';
import { isRequiredDiaryDetail } from '../../utils/typeGuard';
import DiaryBottomSheetListItem from './DiaryBottomSheetListItem';

type Props = {
  dayData: NonNullable<DailySummaryResponseDTO>;
};

const DiaryBottomSheetList = ({ dayData }: Props) => {
  const { year, month, day } = dayData;

  const diaries = dayData.diaries.filter(isRequiredDiaryDetail);
  if (diaries.length === 0) return null;

  return (
    <Wrapper>
      <StyledPagerView initialPage={0} pageMargin={30}>
        {diaries.map((diary) => (
          <DiaryBottomSheetListItem key={diary.diaryId} date={{ year, month, day }} diaryData={diary} />
        ))}
      </StyledPagerView>
    </Wrapper>
  );
};

export default DiaryBottomSheetList;

const Wrapper = styled.View`
  flex: 1;
`;

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;
