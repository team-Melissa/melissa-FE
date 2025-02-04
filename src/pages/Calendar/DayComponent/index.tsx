import { DateData } from "react-native-calendars";
import { Day } from "@/src/types/calendarTypes";
import * as S from "./styles";

interface Props {
  date: DateData;
  calendars?: Day[];
  onPress: () => void;
}

function DayComponent({ date, calendars, onPress }: Props): JSX.Element {
  const dayDiary = calendars?.find(
    (calendar) =>
      calendar.year === date.year && calendar.month === date.month && calendar.day === date.day
  );

  if (!dayDiary) {
    return (
      <S.DayBox disabled={true}>
        <S.ImageBox>
          <S.DayText>{date.day}</S.DayText>
        </S.ImageBox>
      </S.DayBox>
    );
  }

  return (
    <S.DayBox onPress={onPress}>
      <S.ImageBox>
        <S.Image src={dayDiary.imageS3} />
      </S.ImageBox>
      <S.TagBox>
        <S.TagText>{dayDiary.hashTag1}</S.TagText>
      </S.TagBox>
      <S.TagBox>
        <S.TagText>{dayDiary.hashTag2}</S.TagText>
      </S.TagBox>
    </S.DayBox>
  );
}

export default DayComponent;
