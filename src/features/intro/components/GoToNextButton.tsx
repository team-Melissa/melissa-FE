import { shadowProps } from "@/src/constants/shadowProps";
import { theme } from "@/src/constants/theme";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { useRegisterMutation } from "../hooks/mutations/useRegisterMutation";

export const GoToNextButton = () => {
  const router = useRouter();
  const { mutate } = useRegisterMutation();

  const handleClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.replace("/(app)/main");
      },
    });
  };

  return (
    <Button style={shadowProps} onPress={handleClick}>
      <ButtonText>대화하러 가기</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: ${responsiveToPxByHeight("100px")};
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
