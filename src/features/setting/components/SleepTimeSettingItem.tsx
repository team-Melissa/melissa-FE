import * as S from "../styles/SettingItem.styles";

type SleepTimeSettingItemProps = {
  sleepTime: string;
  showDatePicker: (datePickerType: "sleepTime" | "notificationTime") => void;
};

export default function SleepTimeSettingItem({ sleepTime, showDatePicker }: SleepTimeSettingItemProps) {
  const handleButtonPress = () => {
    showDatePicker("sleepTime");
  };

  return (
    <S.ItemButton hitSlop={10} onPress={handleButtonPress}>
      <S.ItemTitleBox>
        <S.ItemTitleText>자는 시간 설정</S.ItemTitleText>
        <S.ItemDescriptionText>해당 시간에 대화를 초기화 해드려요</S.ItemDescriptionText>
      </S.ItemTitleBox>
      <S.ItemValueText>{sleepTime.slice(0, -3)}</S.ItemValueText>
    </S.ItemButton>
  );
}
