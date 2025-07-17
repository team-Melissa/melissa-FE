import styled from "styled-components/native";
import { TAiProfile } from "../types/aiProfileTypes";
import { Text } from "react-native";
import responsiveToPx from "@/src/utils/responsiveToPx";

type Props = {
  aiProfile: TAiProfile;
};

const AiProfile = ({ aiProfile }: Props) => {
  return (
    <Wrapper>
      <Text>{aiProfile.profileName}</Text>
      <Text>{JSON.stringify(aiProfile.default)}</Text>
      <Text>{JSON.stringify(aiProfile.aiProfileId)}</Text>
    </Wrapper>
  );
};

export default AiProfile;

const Wrapper = styled.View`
  width: ${responsiveToPx("130px")};
  height: ${responsiveToPx("190px")};
  margin: ${responsiveToPx("20px")};
  background-color: pink;
`;
