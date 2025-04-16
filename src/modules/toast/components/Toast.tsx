import { useEffect, useState } from "react";
import styled from "styled-components/native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import type { TToast } from "../types/toastTypes";

export const Toast = ({ message, options }: Omit<TToast, "id">) => {
  const [isRender, setIsRender] = useState<boolean>(true);

  useEffect(() => {
    const duration = options?.duration ?? 2000;

    const timer = setTimeout(() => {
      setIsRender(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [options?.duration]);

  if (!isRender) return null;

  return (
    <ToastBox entering={FadeInUp.duration(200)} exiting={FadeOutDown.duration(200)}>
      <ToastText>{message}</ToastText>
    </ToastBox>
  );
};

const ToastBox = styled(Animated.View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 80px;
  left: 20px;
  right: 20px;
  background-color: #333;
  padding: 14px 20px;
  border-radius: 8px;
`;

const ToastText = styled.Text`
  color: white;
  font-size: 15px;
`;
