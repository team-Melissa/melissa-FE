import { DateData } from "react-native-calendars";
import * as S from "./styles";

interface Props {
  date: DateData;
  diary?: string;
  onPress: () => void;
}

function DayComponent({ date, diary }: Props): JSX.Element {
  if (!diary) {
    return (
      <S.DayBox>
        <S.ImageBox>
          <S.DayText>{date.day}</S.DayText>
        </S.ImageBox>
      </S.DayBox>
    );
  }

  return <S.DayBox></S.DayBox>;
}

export default DayComponent;
