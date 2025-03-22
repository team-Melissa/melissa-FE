import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CalendarList, type DateData } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";
import { preventDoublePress } from "@/src/libs/esToolkit";
import { theme } from "@/src/constants/theme";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { useCalendarsQuery } from "../hooks/queries/useCalendarsQuery";
import { useRegisterMutation } from "../hooks/mutations/useRegisterMutation";
import { useBottomSheetBackHandler } from "../hooks/useBottomSheetBackHandler";
import DayComponent from "../components/DayComponent";
import ChatButton from "../components/ChatButton";
import DiaryBottomSheet from "../components/DiaryBottomSheet";
import { calendarLocale } from "../config/calendarLocale";
import type { TPressedDate } from "../types/calendarTypes";

calendarLocale();

export default function MainContainer() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [pressedDate, setPressedDate] = useState<TPressedDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const router = useRouter();
  const { handleDateChange } = useCalendarsQuery();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useBottomSheetBackHandler({ isBottomSheetOpen, bottomSheetRef });
  useRegisterMutation();

  const handleDayPress = (date: DateData) => {
    const { year, month, day } = date;
    setPressedDate({ year, month, day });
    setTimeout(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.expand();
      }
    }, 0);
  };

  const handleSettingPress = preventDoublePress(() => router.push("/(app)/setting"));

  return (
    <SafeView>
      <CalendarList
        theme={calendarThemeProps}
        monthFormat={"yyyy. MM"}
        staticHeader={true}
        horizontal={true}
        pagingEnabled={true}
        pastScrollRange={100}
        futureScrollRange={100}
        disableArrowLeft={true}
        onPressArrowRight={handleSettingPress}
        onMonthChange={({ year, month }) => handleDateChange(year, month)}
        renderArrow={(direction) =>
          direction === "right" && <MaterialIcons name="settings" size={24} color={theme.colors.calendarIcon} />
        }
        onDayPress={handleDayPress}
        dayComponent={DayComponent}
      />
      <ChatButton />
      <DiaryBottomSheet ref={bottomSheetRef} pressedDate={pressedDate} setIsBottomSheetOpen={setIsBottomSheetOpen} />
    </SafeView>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const calendarThemeProps = {
  textDayFontFamily: theme.fontFamily.podkovaRegular, // 캘린더 내 날짜 폰트
  textDayFontSize: parseInt(theme.fontSize.lg), // 캘린더 내 날짜 크기
  dayTextColor: theme.colors.calendarGray, // 캘린더 내 날짜 색상
  textMonthFontFamily: theme.fontFamily.podkovaRegular, // 헤더 년월 폰트
  textMonthFontSize: parseInt(theme.fontSize.xl), // 헤더 년월 크기
  textSectionTitleColor: theme.colors.textGray, // 일 ~ 토 텍스트 색상
  "stylesheet.calendar.header": {
    headerContainer: {
      flexDirection: "row",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: parseInt(responsiveToPx("15px")),
      marginVertical: parseInt(responsiveToPx("25px")), // 캘린더 헤더 상하단 간격
    },
    dayTextAtIndex0: {
      color: theme.colors.calendarRed,
    },
    dayTextAtIndex6: {
      color: theme.colors.calendarBlue,
    },
  },
};
