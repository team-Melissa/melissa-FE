import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { GoToNextButton } from "../components/GoToNextButton";

export const IntroContainer = () => {
  return (
    <Wrapper>
      <Text>인트로 컨테이너</Text>
      <GoToNextButton />
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
