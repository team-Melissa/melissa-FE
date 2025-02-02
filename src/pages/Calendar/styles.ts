import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { theme } from "@/src/constants/theme";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const calendarThemeProps = {
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
      marginVertical: parseInt(responsiveToPx("40px")),
    },
    dayTextAtIndex0: {
      color: theme.colors.calendarRed,
    },
    dayTextAtIndex6: {
      color: theme.colors.calendarBlue,
    },
  },
};
