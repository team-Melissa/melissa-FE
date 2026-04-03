import { renderHook } from '@testing-library/react-native';
import { useEditDiaryQueryParams } from '../hooks/useEditDiaryQueryParams';

const mockParams: Record<string, string | undefined> = {};

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockParams,
}));

describe('useEditDiaryQueryParams', () => {
  beforeEach(() => {
    Object.keys(mockParams).forEach((key) => delete mockParams[key]);
    console.error = jest.fn();
  });

  it('diaryId, year, month, day를 숫자로 변환해 반환', () => {
    mockParams.diaryId = '123';
    mockParams.year = '2024';
    mockParams.month = '3';
    mockParams.day = '15';

    const { result } = renderHook(() => useEditDiaryQueryParams());
    expect(result.current).toEqual({ diaryId: 123, year: 2024, month: 3, day: 15 });
  });

  describe('필수 파라미터 누락', () => {
    it('diaryId가 없으면 에러 throw', () => {
      mockParams.year = '2024';
      mockParams.month = '3';
      mockParams.day = '15';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });

    it('year가 없으면 에러 throw', () => {
      mockParams.diaryId = '123';
      mockParams.month = '3';
      mockParams.day = '15';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });

    it('month가 없으면 에러 throw', () => {
      mockParams.diaryId = '123';
      mockParams.year = '2024';
      mockParams.day = '15';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });

    it('day가 없으면 에러 throw', () => {
      mockParams.diaryId = '123';
      mockParams.year = '2024';
      mockParams.month = '3';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });
  });

  describe('파라미터가 숫자가 아닌 경우', () => {
    it('diaryId가 숫자가 아니면 에러 throw', () => {
      mockParams.diaryId = 'abc';
      mockParams.year = '2024';
      mockParams.month = '3';
      mockParams.day = '15';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });

    it('year가 숫자가 아니면 에러 throw', () => {
      mockParams.diaryId = '123';
      mockParams.year = 'abc';
      mockParams.month = '3';
      mockParams.day = '15';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });

    it('month가 숫자가 아니면 에러 throw', () => {
      mockParams.diaryId = '123';
      mockParams.year = '2024';
      mockParams.month = 'abc';
      mockParams.day = '15';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });

    it('day가 숫자가 아니면 에러 throw', () => {
      mockParams.diaryId = '123';
      mockParams.year = '2024';
      mockParams.month = '3';
      mockParams.day = 'abc';

      expect(() => renderHook(() => useEditDiaryQueryParams())).toThrow();
    });
  });
});
