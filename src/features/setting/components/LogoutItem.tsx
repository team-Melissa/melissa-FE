import * as S from "../styles/SettingItem.styles";

type LogoutItemProps = {
  onPress: () => void;
};

export default function LogoutItem({ onPress }: LogoutItemProps) {
  return (
    <S.ItemButton hitSlop={10} onPress={onPress}>
      <S.ItemTitleBox>
        <S.ItemTitleText>로그아웃</S.ItemTitleText>
      </S.ItemTitleBox>
    </S.ItemButton>
  );
}
