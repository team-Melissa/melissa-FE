import { useEffect } from "react";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import useRegisterSetting from "@/src/hooks/useRegisterSetting";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
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
  const isNewUser = useIsNewUserContext();
  const { isPending, isError, mutate } = useRegisterSetting();

  const handleCopyPress = () => {
    console.log("copy button");
  };

  const handleSettingPress = () => {
    console.log("setting button");
  };

  const handleDayPress = (day: DateData) => {
    console.log("selected day", day);
  };

  useEffect(() => {
    if (isNewUser) {
      mutate();
    }
  }, [isNewUser, mutate]);

  if (isNewUser) {
    if (isPending) {
      return <Loading />;
    }

    if (isError) {
      return (
        <CommonError
          titleText="앱 초기 로딩 중 에러가 발생했어요."
          buttonText="다시 로딩하기"
          onPress={() => mutate()}
        />
      );
    }
  }

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
        onDayPress={handleDayPress}
        renderArrow={(direction) =>
          direction === "left" ? (
            <MaterialIcons name="content-copy" size={24} color={theme.colors.calendarIcon} />
          ) : (
            <MaterialIcons name="settings" size={24} color={theme.colors.calendarIcon} />
          )
        }
      />
    </S.SafeView>
  );
}

export default CalendarPage;
