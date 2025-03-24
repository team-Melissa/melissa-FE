import { Switch } from "react-native";
import * as S from "../styles/SettingItem.styles";

type PushNotiSettingItemProps = {
  value: boolean;
  onChange: () => void;
};

export default function PushNotiSettingItem({ value, onChange }: PushNotiSettingItemProps) {
  return (
    <S.ItemButton disabled={true}>
      <S.ItemTitleBox>
        <S.ItemTitleText>푸시 알림</S.ItemTitleText>
        <S.ItemDescriptionText>푸시 알림을 허용/차단할 수 있어요</S.ItemDescriptionText>
      </S.ItemTitleBox>
      <Switch value={value} onChange={onChange} />
    </S.ItemButton>
  );
}
