import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loading from "@/src/components/ui/Loading";
import responsiveToPx from "@/src/utils/responsiveToPx";
import SettingHeader from "../components/SettingHeader";
import SleepTimeSettingItem from "../components/SleepTimeSettingItem";
import PushNotiSettingItem from "../components/PushNotiSettingItem";
import NotiTimeSettingItem from "../components/NotiTimeSettingItem";
import SendMailItem from "../components/SendMailItem";
import LogoutItem from "../components/LogoutItem";
import DeleteAccountItem from "../components/DeleteAccountItem";
import { useSetting } from "../hooks/useSetting";
import type { UserSettingDTO } from "../types/settingTypes";

type SettingContainerProps = {
  data: UserSettingDTO;
};

export default function SettingContainer({ data }: SettingContainerProps) {
  const {
    isPending,
    sleepTime,
    optimisticToggle,
    notificationTime,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    handleLogoutPress,
    handleDeleteAccountPress,
    handleNotificationSummary,
  } = useSetting(data);

  if (isPending) {
    return <Loading />;
  }

  return (
    <SafeView>
      <SettingHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingBox>
          <SleepTimeSettingItem sleepTime={sleepTime} showDatePicker={showDatePicker} />
          <PushNotiSettingItem value={optimisticToggle} onChange={handleNotificationSummary} />
          <NotiTimeSettingItem notificationTime={notificationTime} showDatePicker={showDatePicker} />
          <SendMailItem />
          <LogoutItem onPress={handleLogoutPress} />
          <DeleteAccountItem onPress={handleDeleteAccountPress} />
        </SettingBox>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeView>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  padding: ${responsiveToPx("26px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

const SettingBox = styled.View`
  width: 100%;
  padding: ${responsiveToPx("22px")} ${responsiveToPx("33px")};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.xxl};
`;
