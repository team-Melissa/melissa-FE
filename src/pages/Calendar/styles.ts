import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { theme } from "@/src/constants/theme";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const DayBox = styled.TouchableOpacity`
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("96px")};
`;

export const ImageBox = styled.View`
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("54px")};
  background-color: blueviolet;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: center;
  align-items: center;
`;

export const TagBox = styled.View`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("15px")};
  margin-top: ${responsiveToPx("6px")};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  justify-content: center;
  padding-left: ${responsiveToPx("4px")};
`;

export const DayText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.podkovaRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textGray};
`;

export const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.black};
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
