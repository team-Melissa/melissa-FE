import type { BasicDayProps } from "react-native-calendars/src/calendar/day/basic";
import type { DateData } from "react-native-calendars";
import styled from "styled-components/native";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import CachedImage from "@/src/components/ui/CachedImage";
import { useCalendarQuery } from "../hooks/queries/useCalendarQuery";

type DayComponentProps = Omit<BasicDayProps, "date"> & {
  date?: DateData;
};

export default function DayComponent({ date, onPress }: DayComponentProps) {
  const { data } = useCalendarQuery({ year: date?.year, month: date?.month });

  if (!date || !data || !onPress) return null;

  const dayDiary = data.find(
    (calendar) => calendar.year === date.year && calendar.month === date.month && calendar.day === date.day
  );

  if (!dayDiary) {
    return (
      <DayBox disabled={true}>
        <ImageBox>
          <DayText>{date.day}</DayText>
        </ImageBox>
      </DayBox>
    );
  }

  return (
    <DayBox onPress={() => onPress(date)}>
      <ImageBox>
        <Image src={dayDiary.imageS3} />
      </ImageBox>
      <TagBox>
        <TagText numberOfLines={1} ellipsizeMode="clip">
          {dayDiary.hashTag1}
        </TagText>
      </TagBox>
      <TagBox>
        <TagText numberOfLines={1} ellipsizeMode="clip">
          {dayDiary.hashTag2}
        </TagText>
      </TagBox>
    </DayBox>
  );
}

const DayBox = styled.TouchableOpacity`
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("96px")};
`;

const ImageBox = styled.View`
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("54px")};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled(CachedImage)`
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("54px")};
`;

const TagBox = styled.View`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("15px")};
  margin-top: ${responsiveToPxByHeight("3px")};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  justify-content: center;
  padding-left: ${responsiveToPx("4px")};
`;

const DayText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.podkovaRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textGray};
`;

const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.black};
`;
