import { useLocalSearchParams } from 'expo-router';

type Params = {
  year?: string;
  month?: string;
  day?: string;
};

export const useDateSearchParams = () => {
  const params = useLocalSearchParams<Params>();
  if (!params || !params.year || !params.month || !params.day) {
    throw new Error('쿼리 파라미터 year, month, day를 전달했는지 확인해주세요.');
  }

  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('쿼리 파라미터 year, month, day가 숫자인지 확인해주세요.');
  }

  return { year, month, day };
};
