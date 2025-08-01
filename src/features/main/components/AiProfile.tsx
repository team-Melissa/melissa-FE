import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { TAiProfile } from "../types/aiProfileTypes";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { debounce } from "@/src/utils/debounce";
import { PlaceholderImage } from "@/src/components/ui/PlaceholderImage";

type Props = {
  aiProfile: TAiProfile;
  backgroundColor: string;
};

const AiProfile = ({ aiProfile, backgroundColor }: Props) => {
  const router = useRouter();

  const handleAiProfilePress = debounce(() => {
    router.push(`/(app)/chatting?aiProfileId=${aiProfile.aiProfileId}`);
  });

  return (
    <Wrapper onPress={handleAiProfilePress} $backgroundColor={backgroundColor}>
      <ImageWrapper>
        {aiProfile.imageUrl ? <SImage source={{ uri: aiProfile.imageUrl }} /> : <PlaceholderImage />}
      </ImageWrapper>
      <NameTxt>{aiProfile.profileName}</NameTxt>
      <FirstTagTxt>{aiProfile.hashTag1}</FirstTagTxt>
      <TagTxt>{aiProfile.hashTag2}</TagTxt>
    </Wrapper>
  );
};

export default AiProfile;

const Wrapper = styled.TouchableOpacity<{ $backgroundColor: string }>`
  width: ${responsiveToPx("130px")};
  height: ${responsiveToPx("190px")};
  margin: ${responsiveToPx("20px")};
  padding: ${responsiveToPx("11px")};
  border-radius: 10px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const ImageWrapper = styled.View`
  width: ${responsiveToPx("108px")};
  height: ${responsiveToPx("108px")};
  border-radius: 5px;
`;

const SImage = styled(Image)`
  width: ${responsiveToPx("108px")};
  height: ${responsiveToPx("108px")};
  border-radius: 5px;
  object-fit: cover;
`;

const NameTxt = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  margin-top: ${responsiveToPx("10px")};
`;

const TagTxt = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
`;

const FirstTagTxt = styled(TagTxt)`
  margin-top: ${responsiveToPx("4px")};
`;
