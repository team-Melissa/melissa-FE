import { useRouter } from "expo-router";
import { Fragment } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/src/constants/theme";
import * as S from "../styles/SettingItem.styles";

export default function SettingHeader() {
  const router = useRouter();

  const handlePrevPress = () => {
    router.back();
  };

  return (
    <Fragment>
      <S.HeaderBox>
        <S.PrevButton hitSlop={15} onPress={handlePrevPress}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </S.PrevButton>
      </S.HeaderBox>
      <S.TitleBox>
        <Ionicons name="settings-sharp" size={42} color={theme.colors.deepGreen} />
        <S.TitleText>설정</S.TitleText>
      </S.TitleBox>
    </Fragment>
  );
}
