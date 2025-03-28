import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDeleteAccountMutation } from "./mutations/useDeleteAccountMutation";
import { useLogoutMutation } from "./mutations/useLogoutMutation";
import { useSettingMutation } from "./mutations/useSettingMutation";
import type { TDatePickerType, UserSettingDTO } from "../types/settingTypes";

export const useSetting = (data: UserSettingDTO) => {
  const { sleepTime, notificationSummary, notificationTime } = data.result;
  const [datePickerType, setDatePickerType] = useState<TDatePickerType>(null);
  const [optimisticToggle, setOptimisticToggle] = useState<boolean>(notificationSummary);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

  const { mutate: settingMutate } = useSettingMutation(data);
  const { isPending: logoutPending, mutate: logoutMutate } = useLogoutMutation();
  const { isPending: deleteAccountPending, mutate: deleteAccountMutate } = useDeleteAccountMutation();

  const isPending = logoutPending || deleteAccountPending;

  const showDatePicker = (datePickerType: NonNullable<TDatePickerType>) => {
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

  const handleLogoutPress = () => {
    logoutMutate();
  };

  const handleDeleteAccountPress = () => {
    Alert.alert(
      "회원탈퇴",
      "정말 탈퇴하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "탈퇴", style: "destructive", onPress: () => deleteAccountMutate() },
      ],
      { cancelable: true }
    );
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

  return {
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
  };
};
