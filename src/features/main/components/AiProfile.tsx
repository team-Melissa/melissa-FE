import styled from "styled-components/native";
import { TAiProfile } from "../types/aiProfileTypes";
import { Text } from "react-native";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { debounce } from "@/src/utils/debounce";
import { useRouter } from "expo-router";

type Props = {
  aiProfile: TAiProfile;
};

const AiProfile = ({ aiProfile }: Props) => {
  const router = useRouter();

  const handleAiProfilePress = debounce(() => {
    router.push(`/(app)/chatting?aiProfileId=${aiProfile.aiProfileId}`);
  });

  return (
    <Wrapper onPress={handleAiProfilePress}>
      <Text>{aiProfile.profileName}</Text>
      <Text>{JSON.stringify(aiProfile.default)}</Text>
      <Text>{JSON.stringify(aiProfile.aiProfileId)}</Text>
    </Wrapper>
  );
};

export default AiProfile;

const Wrapper = styled.TouchableOpacity`
  width: ${responsiveToPx("130px")};
  height: ${responsiveToPx("190px")};
  margin: ${responsiveToPx("20px")};
  background-color: pink;
`;
