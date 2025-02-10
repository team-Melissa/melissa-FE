import { ReactNode } from "react";
import { Pressable } from "react-native";
import * as S from "./styles";
import { shadowProps } from "@/src/constants/shadowProps";

interface Props {
  selected: boolean;
  onPress: () => void;
  children: ReactNode;
}

function QuestionButton({ selected, onPress, children }: Props) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <S.ButtonBox pressed={pressed} selected={selected} style={shadowProps}>
          <S.QuestionText pressed={pressed} selected={selected}>
            {children}
          </S.QuestionText>
        </S.ButtonBox>
      )}
    </Pressable>
  );
}

export default QuestionButton;
