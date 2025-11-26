import { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  type GestureResponderEvent,
  type TouchableOpacityProps,
} from "react-native";
import { useDropdownContext } from "../context/DropdownContext";

export const DropdownTrigger = ({ children, onPress, ...props }: TouchableOpacityProps) => {
  const { isOpen, openDropdown, closeDropdown, triggerPos, setTriggerPos } = useDropdownContext();
  const triggerRef = useRef<View>(null);

  const handleTriggerPress = (e: GestureResponderEvent) => {
    if (isOpen) {
      closeDropdown();
      setTriggerPos(null);
    } else {
      openDropdown();
      triggerRef.current?.measureInWindow((pageX, pageY, width, height) => {
        setTriggerPos({ x: pageX, y: pageY + height, width });
      });
    }
    onPress?.(e);
  };

  useEffect(() => {
    console.log(triggerPos);
  }, [triggerPos]);

  return (
    <TouchableOpacity ref={triggerRef} onPress={handleTriggerPress} {...props}>
      {children}
    </TouchableOpacity>
  );
};
