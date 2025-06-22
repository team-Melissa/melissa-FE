import styled from "styled-components/native";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { PlaceholderImage } from "@/src/components/ui/PlaceholderImage";

type ProfileImageProps = {
  url: string | null;
};

export default function ProfileImage({ url }: ProfileImageProps) {
  return <ImageBox>{url ? <Image src={url} /> : <PlaceholderImage />}</ImageBox>;
}

const ImageBox = styled.View`
  width: ${responsiveToPx("300px")};
  height: ${responsiveToPx("300px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  padding: 3px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled(CachedImage)`
  width: ${responsiveToPx("295px")};
  height: ${responsiveToPx("295px")};
`;
