import { FadeIn, FadeOut } from "react-native-reanimated";

export const fadeIn = (delay: number = 0, duration: number = 300) =>
  FadeIn.delay(delay).duration(duration);

export const fadeOut = (delay: number = 0, duration: number = 300) =>
  FadeOut.delay(delay).duration(duration);

export const fadeInWithCallback = (
  delay: number = 0,
  duration: number = 300,
  callback: (finished: boolean) => void
) => FadeIn.delay(delay).duration(duration).withCallback(callback);
