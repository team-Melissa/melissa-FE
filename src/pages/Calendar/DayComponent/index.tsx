import { DateData } from "react-native-calendars";
import { Day } from "@/src/types/calendarTypes";
import * as S from "./styles";

interface Props {
  date: DateData;
  diaries?: Day[];
  onPress: () => void;
}

function DayComponent({ date, diaries }: Props): JSX.Element {
  const dayDiary = diaries?.find(
    (diary) => diary.year === date.year && diary.month === date.month && diary.day === date.day
  );

  if (!dayDiary) {
    return (
      <S.DayBox>
        <S.ImageBox>
          <S.DayText>{date.day}</S.DayText>
        </S.ImageBox>
      </S.DayBox>
    );
  }

  return (
    <S.DayBox>
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
