import { useSharedValue } from 'react-native-reanimated';

/**
 * @description
 * 기본 캐러셀의 `onSnapToItem`은 애니메이션 종료 후 실행되어 반응이 느립니다.
 * 이 훅은 `onProgressChange`의 `absoluteProgress`를 반올림하여 즉시 인덱스를 감지합니다.
 *
 * @param onCarouselIndexChange - 캐러셀 인덱스가 변경될 때 실행될 콜백 함수
 *
 * @returns progress - 현재 캐러셀의 진행도를 나타내는 `sharedValue`
 * @returns handleProgressChange - 캐러셀의 `onProgressChange`에 전달할 핸들러
 *
 * @example
 * absoluteProgress 반올림 동작:
 * - progress = 0.4 → Math.round(0.4) = 0 → onCarouselIndexChange(0)
 * - progress = 0.7 → Math.round(0.7) = 1 → onCarouselIndexChange(1)
 * - progress = 1.5 → Math.round(1.5) = 2 → onCarouselIndexChange(2)
 */
export const useCarousel = (onCarouselIndexChange?: (index: number) => void) => {
  const progress = useSharedValue<number>(0);

  const handleProgressChange = (_: number, absoluteProgress: number) => {
    progress.value = absoluteProgress;
    onCarouselIndexChange?.(Math.round(absoluteProgress));
  };

  return { progress, handleProgressChange };
};
