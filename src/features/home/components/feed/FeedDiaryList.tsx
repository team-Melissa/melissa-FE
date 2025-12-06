import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { isRequiredDiaryDetail } from '../../utils/typeGuard';
import FeedDiaryListItem from './FeedDiaryListItem';

type Props = {
  dayData: NonNullable<DailySummaryResponseDTO>;
};

// TODO: 한 날짜에 여러 일기가 나오는 경우는, 이 컴포넌트에서 가로 swiper 처리 예정
const FeedDiaryList = ({ dayData }: Props) => {
  const { year, month, day } = dayData;

  return dayData.diaries
    .filter(isRequiredDiaryDetail)
    .map((diary) => <FeedDiaryListItem key={diary.diaryId} date={{ year, month, day }} diaryData={diary} />);
};

export default FeedDiaryList;
