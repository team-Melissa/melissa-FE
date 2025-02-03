import { useEffect, useState } from "react";
import { ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loading from "@/src/components/ui/Loading";
import useUpdateSetting from "@/src/hooks/useUpdateSetting";
import useLogout from "@/src/hooks/useLogout";
import { UserSettingResult } from "@/src/types/settingTypes";
import { theme } from "@/src/constants/theme";
import * as S from "./styles";

interface Props {
  data: UserSettingResult;
}

function SettingPage({ data }: Props): JSX.Element {
  const { sleepTime, notificationSummary, notificationTime } = data.result;

  const [optimisticToggle, setOptimisticToggle] = useState<boolean>(notificationSummary);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [datePickerType, setDatePickerType] = useState<"sleepTime" | "notificationTime" | null>(
    null
  );

  const router = useRouter();
  const { mutate: settingMutate } = useUpdateSetting(data);
  const { isPending, mutate: logoutMutate } = useLogout();

  const showDatePicker = (datePickerType: "sleepTime" | "notificationTime") => {
    setIsDatePickerVisible(true);
    setDatePickerType(datePickerType);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
    setDatePickerType(null);
  };

  const handleConfirm = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    console.log(hours, minutes);

    if (datePickerType) {
      settingMutate({
        ...data.result,
        [datePickerType]: `${hours}:${minutes}:00`,
      });
    }

    hideDatePicker();
  };

  const handlePrevButton = () => {
    router.back();
  };

  const handleLogout = () => {
    logoutMutate();
  };

  const handleNotificationSummary = () => {
    setOptimisticToggle(!notificationSummary);
    settingMutate({
      ...data.result,
      notificationSummary: !notificationSummary,
    });
  };

  useEffect(() => {
    setOptimisticToggle(notificationSummary);
  }, [notificationSummary]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <S.SafeView>
      <S.HeaderBox>
        <S.PrevButton hitSlop={15} onPress={handlePrevButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </S.PrevButton>
      </S.HeaderBox>
      <S.TitleBox>
        <Ionicons name="settings-sharp" size={42} color={theme.colors.deepGreen} />
        <S.TitleText>설정</S.TitleText>
      </S.TitleBox>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.SettingBox>
          <S.ItemButton hitSlop={10} onPress={() => showDatePicker("sleepTime")}>
            <S.ItemTitleBox>
              <S.ItemTitleText>자는 시간 설정</S.ItemTitleText>
              <S.ItemDescriptionText>해당 시간에 대화를 초기화 해드려요</S.ItemDescriptionText>
            </S.ItemTitleBox>
            <S.ItemValueText>{sleepTime.slice(0, -3)}</S.ItemValueText>
          </S.ItemButton>

          <S.ItemButton disabled={true}>
            <S.ItemTitleBox>
              <S.ItemTitleText>푸시 알림</S.ItemTitleText>
              <S.ItemDescriptionText>푸시 알림을 허용/차단할 수 있어요</S.ItemDescriptionText>
            </S.ItemTitleBox>
            <Switch value={optimisticToggle} onChange={handleNotificationSummary} />
          </S.ItemButton>

          <S.ItemButton hitSlop={10} onPress={() => showDatePicker("notificationTime")}>
            <S.ItemTitleBox>
              <S.ItemTitleText>알림 시간 설정</S.ItemTitleText>
              <S.ItemDescriptionText>원하는 시간에 대화할 수 있도록</S.ItemDescriptionText>
              <S.ItemDescriptionText>앱 푸시 알림을 보내드려요</S.ItemDescriptionText>
            </S.ItemTitleBox>
            <S.ItemValueText>{notificationTime.slice(0, -3)}</S.ItemValueText>
          </S.ItemButton>

          <S.ItemButton hitSlop={10}>
            <S.ItemTitleBox>
              <S.ItemTitleText>의견 보내기</S.ItemTitleText>
              <S.ItemDescriptionText>운영진에게 앱에 대한 의견을</S.ItemDescriptionText>
              <S.ItemDescriptionText>전달해주세요</S.ItemDescriptionText>
            </S.ItemTitleBox>
          </S.ItemButton>

          <S.ItemButton hitSlop={10}>
            <S.ItemTitleBox>
              <S.ItemTitleText>후원하기</S.ItemTitleText>
              <S.ItemDescriptionText>후원은 Melissa 서비스 운영에</S.ItemDescriptionText>
              <S.ItemDescriptionText>큰 도움이 됩니다</S.ItemDescriptionText>
            </S.ItemTitleBox>
          </S.ItemButton>

          <S.ItemButton hitSlop={10} onPress={handleLogout}>
            <S.ItemTitleBox>
              <S.ItemTitleText>로그아웃</S.ItemTitleText>
            </S.ItemTitleBox>
          </S.ItemButton>
        </S.SettingBox>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </S.SafeView>
  );
}

export default SettingPage;
