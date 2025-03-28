import type { PropsWithChildren } from "react";
import styled from "styled-components/native";
import { shadowProps } from "@/src/constants/shadowProps";
import responsiveToPx from "@/src/utils/responsiveToPx";

type CardButtonProps = {
  onPress: () => void;
};

export default function CardButton({ onPress, children }: PropsWithChildren<CardButtonProps>) {
  return (
    <Button onPress={onPress} style={shadowProps}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  width: ${responsiveToPx("101px")};
  height: ${responsiveToPx("29px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.black};
`;
