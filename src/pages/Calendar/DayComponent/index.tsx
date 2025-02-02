import { DateData } from "react-native-calendars";
import { Day } from "@/src/types/calendarTypes";
import * as S from "./styles";
import { Image } from "expo-image";

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
        <Image source={dayDiary.imageS3} contentFit="contain" />
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
