import { COLOR, FONT_FAMILY } from "@/src/constants/theme";
import { CalendarList } from "react-native-calendars";
import type { Theme } from "react-native-calendars/src/types";
import CalendarHeader from "./CalendarHeader";

const Calendar = () => {
  return (
    <CalendarList
      theme={calendarTheme}
      horizontal
      pagingEnabled
      hideArrows
      hideDayNames={false}
      pastScrollRange={50}
      futureScrollRange={50}
      headerStyle={{ display: "none" }}
      customHeader={CalendarHeader}
    />
  );
};

export default Calendar;

const calendarTheme = {
  calendarBackground: "transparent",
  textDayFontFamily: FONT_FAMILY.pretendard500,
  textDayFontSize: 13,
  dayTextColor: COLOR.sub1,
  textSectionTitleColor: COLOR.weeks,
} satisfies Theme;
