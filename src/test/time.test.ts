import { threadDateExpired } from "@/src/utils/time";

describe("threadDateExpired", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("현재 시간이 3시 30분이고 sleepHour가 3시일 때", () => {
    jest.setSystemTime(new Date(2025, 1, 5, 3, 30));

    const result = threadDateExpired(3);
    expect(result).toEqual([{ year: 2025, month: 2, day: 5 }, new Date(2025, 1, 6, 3)]);
  });

  test("현재 시간이 2시이고 sleepHour가 3시일 때", () => {
    jest.setSystemTime(new Date(2025, 1, 5, 2, 0));

    const result = threadDateExpired(3);
    expect(result).toEqual([{ year: 2025, month: 2, day: 4 }, new Date(2025, 1, 5, 3)]);
  });

  test("현재 시간이 13시이고 sleepHour가 3시일 때", () => {
    jest.setSystemTime(new Date(2025, 1, 5, 13, 0));

    const result = threadDateExpired(3);
    expect(result).toEqual([{ year: 2025, month: 2, day: 5 }, new Date(2025, 1, 6, 3)]);
  });

  test("현재가 2월 28일 23시이고 sleepHour가 2시일 때", () => {
    jest.setSystemTime(new Date(2025, 1, 28, 23, 0));

    const result = threadDateExpired(2);
    expect(result).toEqual([{ year: 2025, month: 2, day: 28 }, new Date(2025, 2, 1, 2)]);
  });

  test("현재가 12월 31일 23시이고 sleepHour가 3시일 때", () => {
    jest.setSystemTime(new Date(2025, 11, 31, 23, 0));

    const result = threadDateExpired(3);
    expect(result).toEqual([{ year: 2025, month: 12, day: 31 }, new Date(2026, 0, 1, 3)]);
  });
});
