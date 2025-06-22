import styled from "styled-components/native";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { shadowProps } from "@/src/constants/shadowProps";
import { PlaceholderImage } from "@/src/components/ui/PlaceholderImage";

type AiChatBoxProps = {
  content: string;
  imageUrl: string | null;
};

export default function AiChatBox({ content, imageUrl }: AiChatBoxProps) {
  return (
    <AiChatLayout>
      <ImageBox>{imageUrl ? <Image src={imageUrl} /> : <PlaceholderImage />}</ImageBox>
      <AiChatTextBox style={shadowProps}>
        <AiChatText>{content}</AiChatText>
      </AiChatTextBox>
    </AiChatLayout>
  );
}

const AiChatLayout = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${responsiveToPx("12px")} ${responsiveToPx("10px")};
  gap: ${({ theme }) => theme.gap.md};
`;

const ImageBox = styled.View`
  width: ${responsiveToPx("36px")};
  height: ${responsiveToPx("36px")};
  border-radius: 9999px;
  overflow: hidden;
`;

const Image = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

const AiChatTextBox = styled.View`
  max-width: ${responsiveToPx("290px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${responsiveToPx("12px")} ${responsiveToPx("15px")};
  align-self: flex-start;
`;

const AiChatText = styled.Text`
  color: ${({ theme }) => theme.colors.assistantChat};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${responsiveToPx("24px")};
`;
