import { useLocalSearchParams } from 'expo-router';

type Params = {
  diaryId?: string;
  year?: string;
  month?: string;
  day?: string;
};

export const useEditDiaryQueryParams = () => {
  const params = useLocalSearchParams<Params>();

  if (!params || !params.diaryId || !params.year || !params.month || !params.day) {
    throw new Error('쿼리 파라미터 diaryId, year, month, day를 전달했는지 확인해주세요.');
  }

  const diaryId = Number(params.diaryId);
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);

  if (isNaN(diaryId) || isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('쿼리 파라미터 diaryId, year, month, day가 숫자인지 확인해주세요.');
  }

  return { diaryId, year, month, day };
};
