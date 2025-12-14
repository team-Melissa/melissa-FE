import { isValidCharacterId } from '@/src/modules/character';
import { useLocalSearchParams } from 'expo-router';

type Params = {
  aiProfileId?: string;
  year?: string;
  month?: string;
  day?: string;
};

export const useChattingQueryParams = () => {
  const params = useLocalSearchParams<Params>();
  if (!params || !params.aiProfileId || !params.year || !params.month || !params.day) {
    throw new Error('쿼리 파라미터 aiProfileId, year, month, day를 전달했는지 확인해주세요.');
  }

  const aiProfileId = Number(params.aiProfileId);
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);

  if (!isValidCharacterId(aiProfileId) || isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('쿼리 파라미터 aiProfileId, year, month, day가 숫자인지 확인해주세요.');
  }

  return { aiProfileId, year, month, day };
};
