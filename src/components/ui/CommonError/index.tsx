import Button from "@/src/components/ui/Button";
import * as S from "./styles";

interface Props {
  titleText: string;
  buttonText: string;
  onPress: () => void;
}

function CommonError({ titleText, buttonText, onPress }: Props) {
  return (
    <S.SafeView>
      <S.InfoText>{titleText}</S.InfoText>
      <Button onPress={onPress}>{buttonText}</Button>
    </S.SafeView>
  );
}

export default CommonError;
