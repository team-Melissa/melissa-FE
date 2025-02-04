import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import useCurrentDate from "@/src/hooks/useCurrentDate";
import DayComponent from "./DayComponent";
import ChatButton from "./ChatButton";
import DiaryBottomSheet from "./DiaryBottomSheet";
import { theme } from "@/src/constants/theme";
import * as S from "./styles";

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
  // BottomSheet를 열고 닫기 위해 전달할 state
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  // 초기값은 오늘로
  const [pressedDate, setPressedDate] = useState<Pick<DateData, "year" | "month" | "day">>(() => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  }));

  const router = useRouter();
  const { calendarsData, changeDate } = useCurrentDate();

  const handleCopyPress = () => {
    console.log("copy button");
  };

  const handleSettingPress = () => {
    router.push("/(app)/setting");
  };

  const handleDayPress = (date: DateData) => {
    const { year, month, day } = date;
    setIsBottomSheetOpen(true);
    setPressedDate({ year, month, day });
  };

  useEffect(() => {
    console.log(isBottomSheetOpen);
  }, [isBottomSheetOpen]);

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
            <DayComponent
              date={date}
              calendars={calendarsData}
              onPress={() => handleDayPress(date)}
            />
          );
        }}
      />
      <ChatButton onPress={() => {}} />
      <DiaryBottomSheet
        pressedDate={pressedDate}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
    </S.SafeView>
  );
}

export default CalendarPage;
