import { Body1 } from '@/src/core/Txt';
import { responsiveToPxByHeight } from '@/src/utils/responsiveToPx';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { DEFAULT_DURATION, TOAST_ICON } from '../constants/toastConstants';
import type { TToast } from '../types/toastTypes';

export const Toast = ({ message, options }: Omit<TToast, 'id'>) => {
  const [isRender, setIsRender] = useState<boolean>(true);
  const duration = options?.duration ?? DEFAULT_DURATION;
  const type = options?.type ?? 'success';
  const Icon = TOAST_ICON[type];

  const handleToastTouch = () => setIsRender(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRender(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isRender) return null;

  return (
    <ToastBox
      onTouchStart={handleToastTouch}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <Icon />
      <View>
        <Body1 color="white">{message}</Body1>
      </View>
    </ToastBox>
  );
};

const ToastBox = styled(Animated.View)`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  align-self: center;
  bottom: ${responsiveToPxByHeight('100px')};
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 99px;
`;
