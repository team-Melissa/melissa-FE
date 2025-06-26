import responsiveToPx from "@/src/utils/responsiveToPx";
import { Image, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import styled from "styled-components/native";
import { PropsWithChildren, useEffect } from "react";

export const IntroContent = ({ children }: PropsWithChildren) => {
  const imgY = useSharedValue(50);
  const imgOpacity = useSharedValue(0);

  const txtY = useSharedValue(50);
  const txtOpacity = useSharedValue(0);

  useEffect(() => {
    txtY.value = 50;
    txtOpacity.value = 0;

    imgY.value = withTiming(0, { duration: 500 });
    imgOpacity.value = withTiming(1, { duration: 500 });

    txtY.value = withDelay(300, withTiming(0, { duration: 500 }));
    txtOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, [children, imgOpacity, imgY, txtOpacity, txtY]);

  const imgStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imgY.value }],
    opacity: imgOpacity.value,
  }));

  const txtStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: txtY.value }],
    opacity: txtOpacity.value,
  }));

  return (
    <ContentWrapper>
      <StyledImage source={require("@/assets/images/logo.png")} style={imgStyle} />
      <TextWrapper style={txtStyle}>{children}</TextWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.View`
  height: ${responsiveToPx("200px")};
  justify-content: start;
  align-items: center;
  gap: ${responsiveToPx("20px")};
`;

const StyledImage = styled(Animated.createAnimatedComponent(Image))`
  width: ${responsiveToPx("102px")};
  height: ${responsiveToPx("82px")};
`;

const TextWrapper = styled(Animated.createAnimatedComponent(View))`
  display: flex;
  justify-content: center;
  align-items: center;
`;
