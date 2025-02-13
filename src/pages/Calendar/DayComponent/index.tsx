import { useQuery } from "@tanstack/react-query";
import { BasicDayProps } from "react-native-calendars/src/calendar/day/basic";
import { DateData } from "react-native-calendars";
import { MonthCalendar } from "@/src/types/calendarTypes";
import * as S from "./styles";

interface Props extends Omit<BasicDayProps, "date"> {
  date?: DateData;
}

function DayComponent({ date, onPress }: Props): JSX.Element | null {
  const { data } = useQuery<MonthCalendar>({
    queryKey: ["calendar", date?.year, date?.month],
  });

  if (!date || !data) return null;

  const dayDiary = data.result.find(
    (calendar) =>
      calendar.year === date.year && calendar.month === date.month && calendar.day === date.day
  );

  if (!dayDiary || dayDiary.imageS3 === null) {
    return (
      <S.DayBox disabled={true}>
        <S.ImageBox>
          <S.DayText>{date.day}</S.DayText>
        </S.ImageBox>
      </S.DayBox>
    );
  }

  return (
    <S.DayBox onPress={() => onPress && onPress(date)}>
      <S.ImageBox>
        <S.Image src={dayDiary.imageS3} />
      </S.ImageBox>
      <S.TagBox>
        <S.TagText numberOfLines={1} ellipsizeMode="clip">
          {dayDiary.hashTag1}
        </S.TagText>
      </S.TagBox>
      <S.TagBox>
        <S.TagText numberOfLines={1} ellipsizeMode="clip">
          {dayDiary.hashTag2}
        </S.TagText>
      </S.TagBox>
    </S.DayBox>
  );
}

export default DayComponent;
