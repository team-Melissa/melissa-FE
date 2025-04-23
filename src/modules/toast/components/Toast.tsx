import { useEffect, useState } from "react";
import { Image } from "expo-image";
import styled from "styled-components/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import responsiveToPx from "@/src/utils/responsiveToPx";
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
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={shadowProps}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <ToastIcon source={require("@/assets/images/warning-icon.svg")} />
      <ToastText>{message}</ToastText>
    </ToastBox>
  );
};

const ToastBox = styled(Animated.View)`
  width: ${responsiveToPx("380px")};
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
  align-items: center;
  align-self: center;
  bottom: 50px;
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const ToastIcon = styled(Image)`
  width: ${responsiveToPx("24px")};
  height: ${responsiveToPx("24px")};
`;

const ToastText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
