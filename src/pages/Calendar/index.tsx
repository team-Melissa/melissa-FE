import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import useCurrentDate from "@/src/hooks/useCurrentDate";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DayComponent from "./DayComponent";
import ChatButton from "./ChatButton";
import { theme } from "@/src/constants/theme";
import * as S from "./styles";
import { useRouter } from "expo-router";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

function CalendarPage(): JSX.Element {
  const router = useRouter();
  const { diariesData, changeDate } = useCurrentDate();

  const handleCopyPress = () => {
    console.log("copy button");
  };

  const handleSettingPress = () => {
    router.push("/(app)/setting");
  };

  const handleDayPress = (day: DateData) => {
    console.log("selected day", day);
  };

  return (
    <S.SafeView>
      <CalendarList
        theme={S.calendarThemeProps}
        monthFormat={"yyyy. MM"}
        staticHeader={true}
        horizontal={true}
        pagingEnabled={true}
        pastScrollRange={100}
        futureScrollRange={100}
        onPressArrowLeft={handleCopyPress}
        onPressArrowRight={handleSettingPress}
        onMonthChange={({ year, month }) => changeDate(year, month)}
        renderArrow={(direction) =>
          direction === "left" ? (
            <MaterialIcons name="content-copy" size={24} color={theme.colors.calendarIcon} />
          ) : (
            <MaterialIcons name="settings" size={24} color={theme.colors.calendarIcon} />
          )
        }
        dayComponent={({ date }) => {
          if (!date) return undefined;
          return (
            <DayComponent date={date} diaries={diariesData} onPress={() => handleDayPress(date)} />
          );
        }}
      />
      <ChatButton onPress={() => {}} />
    </S.SafeView>
  );
}

export default CalendarPage;
