import responsiveToPx from "@/src/utils/responsiveToPx";
import type { GestureResponderEvent, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { useDropdownContext } from "../context/DropdownContext";

export const DropdownItem = ({ children, onPress, ...props }: TouchableOpacityProps) => {
  const { closeDropdown } = useDropdownContext();

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    closeDropdown();
  };

  return (
    <StyledItem onPress={handlePress} {...props}>
      {children}
    </StyledItem>
  );
};

const StyledItem = styled.TouchableOpacity`
  padding: ${responsiveToPx("12px")} ${responsiveToPx("16px")};
  min-height: ${responsiveToPx("44px")};
  justify-content: center;
`;
