type ThreadDate = {
  year: number;
  month: number;
  day: number;
};

type ExpiredDate = Date;

export const getThreadDateExpired = (sleepHour: number): [ThreadDate, ExpiredDate] => {
  const date = new Date();
  const curHour = date.getHours();

  const createdDate = new Date();
  const expiredDate = new Date();

  if (sleepHour <= curHour) {
    // 자는 시간 <= 생성 시간 : 스레드 생성은 당일, 만료일은 다음날 자는 시간
    expiredDate.setDate(expiredDate.getDate() + 1);
  } else {
    // 자는 시간 > 생성 시간: 스레드 생성은 전날, 만료일은 오늘 자는 시간
    createdDate.setDate(createdDate.getDate() - 1);
  }

  expiredDate.setHours(sleepHour, 0, 0, 0); // 분 초 ms는 0으로

  return [
    {
      year: createdDate.getFullYear(),
      month: createdDate.getMonth() + 1,
      day: createdDate.getDate(),
    },
    expiredDate,
  ];
};

// 만료일 이후인지 확인
export const checkThreadExpire = (expiredDate: ExpiredDate) => {
  const now = new Date();
  return now > expiredDate;
};
