import { useRef } from "react";
import {
  TouchableOpacity,
  View,
  type GestureResponderEvent,
  type TouchableOpacityProps,
} from "react-native";
import { useDropdownContext } from "../context/DropdownContext";

export const DropdownTrigger = ({ children, onPress, ...props }: TouchableOpacityProps) => {
  const { isOpen, openDropdown, closeDropdown, setTriggerPos } = useDropdownContext();
  const triggerRef = useRef<View>(null);

  const handleTriggerPress = (e: GestureResponderEvent) => {
    if (isOpen) {
      closeDropdown();
      setTriggerPos(null);
    } else {
      triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        console.log("measureInWindow:", pageY, height);
        setTriggerPos({ x: pageX, y: pageY + height, width });
        openDropdown();
      });
    }
    onPress?.(e);
  };

  return (
    <TouchableOpacity ref={triggerRef} onPress={handleTriggerPress} {...props}>
      {children}
    </TouchableOpacity>
  );
};
