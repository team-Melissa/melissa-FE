import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";
import useCurrentDate from "@/src/hooks/useCurrentDate";
import DayComponent from "./DayComponent";
import ChatButton from "./ChatButton";
import DiaryBottomSheet from "./DiaryBottomSheet";
import { preventDoublePress } from "@/src/libs/esToolkit";
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
  // 초기값은 오늘로
  const [pressedDate, setPressedDate] = useState<Pick<DateData, "year" | "month" | "day">>(() => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  }));

  const router = useRouter();
  const { changeDate } = useCurrentDate();
  const bottomSheetRef = useRef<BottomSheet>(null); // BottomSheet(자식 컴포넌트)를 조작하기 위한 부모 ref

  const handleSettingPress = preventDoublePress(() => router.push("/(app)/setting"));

  const handleDayPress = (date: DateData) => {
    const { year, month, day } = date;
    setPressedDate({ year, month, day });
    setTimeout(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.expand();
      }
    }, 0);
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
        disableArrowLeft={true}
        onPressArrowRight={handleSettingPress}
        onMonthChange={({ year, month }) => changeDate(year, month)}
        renderArrow={(direction) =>
          direction === "right" && (
            <MaterialIcons name="settings" size={24} color={theme.colors.calendarIcon} />
          )
        }
        onDayPress={handleDayPress}
        dayComponent={DayComponent}
      />
      <ChatButton />
      <DiaryBottomSheet ref={bottomSheetRef} pressedDate={pressedDate} />
    </S.SafeView>
  );
}

export default CalendarPage;
