import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { MaterialIcons, Fontisto, Feather } from "@expo/vector-icons";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";
import { PlaceholderImage } from "@/src/components/ui/PlaceholderImage";

type Props = {
  imageSrc: string | null;
  assistantName: string;
  onSavePress: () => void;
  onMenuPress: () => void;
  readonly?: boolean;
};

export default function ChatHeader({ imageSrc, assistantName, onSavePress, onMenuPress, readonly }: Props) {
  const router = useRouter();

  return (
    <HeaderBox>
      <StyledButton onPress={() => router.back()} hitSlop={7}>
        <MaterialIcons name="arrow-back-ios" size={24} color={theme.colors.black} />
      </StyledButton>
      <ProfileBox>
        <ImageBox>{imageSrc ? <Image src={imageSrc} /> : <PlaceholderImage />}</ImageBox>
        <AiNameText>{assistantName}</AiNameText>
      </ProfileBox>
      <ButtonBox>
        <StyledButton onPress={onSavePress} hitSlop={7}>
          <Fontisto name="save" size={24} color="black" />
        </StyledButton>
        <StyledButton onPress={onMenuPress} hitSlop={7}>
          <Feather name="menu" size={24} color="black" />
        </StyledButton>
      </ButtonBox>
    </HeaderBox>
  );
}

const HeaderBox = styled.View`
  width: 100%;
  height: ${responsiveToPxByHeight("110px")};
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  padding: 0px ${responsiveToPx("24px")};
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;

const StyledButton = styled.TouchableOpacity`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
  align-items: center;
`;

const ImageBox = styled.View`
  width: ${responsiveToPx("48px")};
  height: ${responsiveToPx("48px")};
  border-radius: 9999px;
  overflow: hidden;
`;

const Image = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

const AiNameText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const ButtonBox = styled.View`
  width: ${responsiveToPx("60px")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
