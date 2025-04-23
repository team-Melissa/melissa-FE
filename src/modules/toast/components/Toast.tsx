import { useEffect, useState } from "react";
import styled from "styled-components/native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { shadowProps } from "@/src/constants/shadowProps";
import { DEFAULT_DURATION } from "../constants/toastConstants";
import type { TToast } from "../types/toastTypes";

export const Toast = ({ message, options }: Omit<TToast, "id">) => {
  const [isRender, setIsRender] = useState<boolean>(true);

  const handleToastTouch = () => setIsRender(false);

  useEffect(() => {
    const duration = options?.duration ?? DEFAULT_DURATION;

    const timer = setTimeout(() => {
      setIsRender(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [options?.duration]);

  if (!isRender) return null;

  return (
    <ToastBox
      onTouchStart={handleToastTouch}
      entering={FadeInDown.duration(100)}
      exiting={FadeOutUp.duration(100)}
      style={shadowProps}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <ToastText>{message}</ToastText>
    </ToastBox>
  );
};

const ToastBox = styled(Animated.View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 50px;
  left: ${({ theme }) => theme.gap.xxl};
  right: ${({ theme }) => theme.gap.xxl};
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const ToastText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
