import * as Linking from "expo-linking";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";
import * as S from "../styles/SettingItem.styles";

export default function SendMailItem() {
  const handleSendMail = async () => {
    try {
      const data = await Linking.openURL(
        "mailto: teammelissa7@gmail.com?subject=[Melissa] 제목을 작성해주세요.&body=내용을 작성해주세요."
      );
      console.log(data);
    } catch (e) {
      console.error(e);
      showToast(toastMessage.sendMailFailed, "error");
    }
  };

  return (
    <S.ItemButton hitSlop={10} onPress={handleSendMail}>
      <S.ItemTitleBox>
        <S.ItemTitleText>의견 보내기</S.ItemTitleText>
        <S.ItemDescriptionText>운영진에게 앱에 대한 의견을</S.ItemDescriptionText>
        <S.ItemDescriptionText>전달해주세요</S.ItemDescriptionText>
      </S.ItemTitleBox>
    </S.ItemButton>
  );
}
