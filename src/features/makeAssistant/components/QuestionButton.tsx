import styled from "styled-components/native";
import { Pressable } from "react-native";
import type { ReactNode } from "react";
import { shadowProps } from "@/src/constants/shadowProps";
import responsiveToPx from "@/src/utils/responsiveToPx";

type QuestionButtonProps = {
  selected: boolean;
  onPress: () => void;
  children: ReactNode;
};

type StyledButtonProps = {
  pressed: boolean;
  selected: boolean;
};

export default function QuestionButton({ selected, onPress, children }: QuestionButtonProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <ButtonBox pressed={pressed} selected={selected} style={shadowProps}>
          <QuestionText pressed={pressed} selected={selected}>
            {children}
          </QuestionText>
        </ButtonBox>
      )}
    </Pressable>
  );
}

const ButtonBox = styled.View<StyledButtonProps>`
  width: ${responsiveToPx("340px")};
  height: ${responsiveToPx("50px")};
  justify-content: center;
  align-items: center;
  background-color: ${({ pressed, selected, theme }) =>
    pressed || selected ? theme.colors.deepGreen : theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

const QuestionText = styled.Text<StyledButtonProps>`
  font-family: ${({ pressed, selected, theme }) =>
    pressed || selected ? theme.fontFamily.nsExtraBold : theme.fontFamily.nsRegular};
  color: ${({ pressed, selected, theme }) => (pressed || selected ? theme.colors.white : theme.colors.black)};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
