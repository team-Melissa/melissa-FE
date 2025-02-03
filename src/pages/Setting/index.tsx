import { UserSettingResult } from "@/src/types/settingTypes";
import * as S from "./styles";

interface Props {
  data: UserSettingResult;
}

function SettingPage({ data }: Props): JSX.Element {
  return (
    <S.SafeView>
      <S.TempText>설정 페이지</S.TempText>
    </S.SafeView>
  );
}

export default SettingPage;
