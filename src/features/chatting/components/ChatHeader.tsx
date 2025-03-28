import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";

type ChatHeaderProps = {
  imageSrc: string;
  assistantName: string;
  onPress: () => void;
  readonly?: boolean;
};

export default function ChatHeader({ imageSrc, assistantName, onPress, readonly }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <HeaderBox>
      <BackButton onPress={() => router.back()} hitSlop={7}>
        <MaterialIcons name="arrow-back-ios" size={28} color={theme.colors.black} />
      </BackButton>
      <HeaderButton onPress={onPress} hitSlop={7} disabled={readonly}>
        <Image src={imageSrc} />
        <AiNameText>{assistantName}</AiNameText>
      </HeaderButton>
    </HeaderBox>
  );
}

const HeaderBox = styled.View`
  width: 100%;
  height: ${responsiveToPxByHeight("110px")};
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  padding: 0px ${responsiveToPx("24px")};
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;

const BackButton = styled.TouchableOpacity`
  width: ${responsiveToPx("28px")};
  height: ${responsiveToPx("28px")};
  justify-content: center;
  align-items: center;
`;

const HeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
  align-items: center;
`;

const Image = styled(CachedImage)`
  width: ${responsiveToPx("48px")};
  height: ${responsiveToPx("48px")};
  border-radius: 9999px;
`;

const AiNameText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;
