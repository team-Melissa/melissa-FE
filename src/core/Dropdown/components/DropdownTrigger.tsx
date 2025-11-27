import { useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type TouchableOpacityProps,
} from "react-native";
import { useDropdownContext } from "../context/DropdownContext";

export const DropdownTrigger = ({ children, onPress, ...props }: TouchableOpacityProps) => {
  const { isOpen, openDropdown, closeDropdown, setTriggerPos } = useDropdownContext();
  const triggerRef = useRef<View>(null);
  const [triggerHeight, setTriggerHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    // 안드로이드에서 onLayout이 height 0으로 다시 호출되는 경우 무시
    if (height > 0) {
      setTriggerHeight(height);
    }
    console.log("onLayout height:", height);
  };

  const handleTriggerPress = (e: GestureResponderEvent) => {
    if (isOpen) {
      closeDropdown();
      setTriggerPos(null);
    } else {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        console.log("measureInWindow:", pageY, triggerHeight);
        // onLayout에서 저장한 height 사용
        setTriggerPos({ x: pageX, y: pageY + triggerHeight, width });
        openDropdown();
      });
    }
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      ref={triggerRef}
      onLayout={handleLayout}
      onPress={handleTriggerPress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
