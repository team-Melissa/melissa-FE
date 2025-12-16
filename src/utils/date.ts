export const getTodayDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return { year, month, day };
};

/**
 * ISO 8601 형식의 날짜 문자열을 year, month, day 형식으로 변환합니다.
 * @param isoDateString - ISO 8601 형식의 날짜 문자열 (Ex: "2025-12-05T11:59:44.351672")
 * @returns `year`, `month`, `day` 객체
 * @example parseIso8601DateString("2025-12-05T11:59:44.351672") // { year: 2025, month: 12, day: 5 }
 */
export const parseIso8601DateString = (isoDateString: string) => {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
};
