import { shadowProps } from "@/src/constants/shadowProps";
import { theme } from "@/src/constants/theme";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { useRegisterMutation } from "../hooks/mutations/useRegisterMutation";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export const GoToNextButton = () => {
  const router = useRouter();
  const { mutate } = useRegisterMutation();

  const viewY = useSharedValue(50);
  const viewOpacity = useSharedValue(0);

  const handleClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.replace("/(app)/main");
      },
    });
  };

  useEffect(() => {
    viewY.value = withDelay(900, withTiming(0, { duration: 500 }));
    viewOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));
  }, [viewY, viewOpacity]);

  const viewStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: viewY.value }],
    opacity: viewOpacity.value,
  }));

  return (
    <StyledView style={viewStyle}>
      <Button style={shadowProps} onPress={handleClick}>
        <ButtonText>대화하러 가기</ButtonText>
      </Button>
    </StyledView>
  );
};

const StyledView = styled(Animated.View)`
  position: absolute;
  bottom: ${responsiveToPxByHeight("100px")};
`;

const Button = styled.TouchableOpacity`
  width: ${responsiveToPx("170px")};
  height: ${responsiveToPx("40px")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.deepGreen};
  border-radius: 20px;
`;

const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: ${theme.colors.white};
`;
