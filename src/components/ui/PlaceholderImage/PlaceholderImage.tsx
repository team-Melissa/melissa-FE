import { ImageProps } from "expo-image";
import CachedImage from "../CachedImage";
import styled from "styled-components/native";
import { Animated, Easing, type LayoutChangeEvent } from "react-native";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_IMG_SRC = "https://melissa-s3.s3.ap-northeast-2.amazonaws.com/default.png";

export const PlaceholderImage = (props: Omit<ImageProps, "src">) => {
  const [width, setWidth] = useState<number>(0);

  const translateX = useRef(new Animated.Value(0)).current;

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
    translateX.setValue(-e.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (width === 0) return;

    const animated = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.delay(1500),
        Animated.timing(translateX, {
          toValue: -width,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animated.start();
    return () => animated.stop();
  }, [translateX, width]);

  return (
    <Wrapper onLayout={onLayout}>
      <SCachedImage src={PLACEHOLDER_IMG_SRC} {...props} />
      <AnimatedShimmer style={{ transform: [{ translateX }] }} />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const SCachedImage = styled(CachedImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AnimatedShimmer = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`);
