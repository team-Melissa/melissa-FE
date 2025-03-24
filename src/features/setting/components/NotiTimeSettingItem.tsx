import * as S from "../styles/SettingItem.styles";

type NotiTimeSettingItemProps = {
  notificationTime: string;
  showDatePicker: (datePickerType: "sleepTime" | "notificationTime") => void;
};

export default function NotiTimeSettingItem({ notificationTime, showDatePicker }: NotiTimeSettingItemProps) {
  const handleButtonPress = () => {
    showDatePicker("notificationTime");
  };

  return (
    <S.ItemButton hitSlop={10} onPress={handleButtonPress}>
      <S.ItemTitleBox>
        <S.ItemTitleText>알림 시간 설정</S.ItemTitleText>
        <S.ItemDescriptionText>원하는 시간에 대화할 수 있도록</S.ItemDescriptionText>
        <S.ItemDescriptionText>앱 푸시 알림을 보내드려요</S.ItemDescriptionText>
      </S.ItemTitleBox>
      <S.ItemValueText>{notificationTime.slice(0, -3)}</S.ItemValueText>
    </S.ItemButton>
  );
}
