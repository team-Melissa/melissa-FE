import { ReactNode } from "react";
import * as S from "./styles";
import { shadowProps } from "@/src/constants/shadowProps";

interface Props {
  onPress: () => void;
  children: ReactNode;
}

function CardButton({ onPress, children }: Props) {
  return (
    <S.Button onPress={onPress} style={shadowProps}>
      <S.ButtonText>{children}</S.ButtonText>
    </S.Button>
  );
}

export default CardButton;
