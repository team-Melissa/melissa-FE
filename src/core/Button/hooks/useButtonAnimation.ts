import { useRef } from "react";
import { Animated } from "react-native";

export const useButtonAnimation = () => {
  const animationRef = useRef<Animated.Value>(new Animated.Value(0));

  const translateY = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  const handlePressIn = () => {
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animationRef.current, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  return { translateY, handlePressIn, handlePressOut };
};
