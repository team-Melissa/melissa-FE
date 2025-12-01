import { CalendarList } from "react-native-calendars";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";

const Calendar = () => {
  return (
    <CalendarList
      horizontal
      pagingEnabled
      pastScrollRange={50}
      futureScrollRange={50}
      theme={{ calendarBackground: "transparent" }}
      headerStyle={{ display: "none" }}
      staticHeader
      customHeader={CalendarHeader}
      dayComponent={CalendarDay}
    />
  );
};

export default Calendar;
