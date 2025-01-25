import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

type ButtonProps = {
  pressed: boolean;
  selected: boolean;
};

export const ButtonBox = styled.View<ButtonProps>`
  width: ${responsiveToPx("340px")};
  height: ${responsiveToPx("50px")};
  justify-content: center;
  align-items: center;
  background-color: ${({ pressed, selected, theme }) =>
    pressed || selected ? theme.colors.deepGreen : theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

export const QuestionText = styled.Text<ButtonProps>`
  font-family: ${({ pressed, selected, theme }) =>
    pressed || selected ? theme.fontFamily.nsExtraBold : theme.fontFamily.nsRegular};
  color: ${({ pressed, selected, theme }) =>
    pressed || selected ? theme.colors.white : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
