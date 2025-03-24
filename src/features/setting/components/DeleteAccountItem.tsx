import * as S from "../styles/SettingItem.styles";

type DeleteAccountItemProps = {
  onPress: () => void;
};

export default function DeleteAccountItem({ onPress }: DeleteAccountItemProps) {
  return (
    <S.ItemButton hitSlop={10} onPress={onPress}>
      <S.ItemTitleBox>
        <S.DeleteAccountText>회원 탈퇴</S.DeleteAccountText>
      </S.ItemTitleBox>
    </S.ItemButton>
  );
}
