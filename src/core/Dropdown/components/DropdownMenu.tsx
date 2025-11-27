import { useState } from "react";
import { Modal, TouchableWithoutFeedback, View, type ViewProps } from "react-native";
import Animated, { FadeIn, FadeOut, type AnimatedProps } from "react-native-reanimated";
import styled from "styled-components/native";
import { useDropdownContext } from "../context/DropdownContext";

export const DropdownMenu = ({ children, ...props }: AnimatedProps<ViewProps>) => {
  const { isOpen, closeDropdown, triggerPos } = useDropdownContext();
  const [width, setWidth] = useState<number>(0);

  if (!isOpen || !triggerPos) return null;

  const top = triggerPos.y + 10;
  const left = triggerPos.x + triggerPos.width - width;

  return (
    <Modal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={closeDropdown}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeDropdown}>
        <Backdrop>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={{ position: "absolute", top, left }}>
              <StyledMenu
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
                {...props}
              >
                {children}
              </StyledMenu>
            </View>
          </TouchableWithoutFeedback>
        </Backdrop>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Backdrop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const StyledMenu = styled(Animated.View)`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4px 0;
  z-index: 1000;
`;
