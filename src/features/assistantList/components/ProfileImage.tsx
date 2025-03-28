import styled from "styled-components/native";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx from "@/src/utils/responsiveToPx";

type ProfileImageProps = {
  url: string;
};

export default function ProfileImage({ url }: ProfileImageProps) {
  return (
    <ImageBox>
      <Image src={url} />
    </ImageBox>
  );
}

const ImageBox = styled.View`
  width: ${responsiveToPx("300px")};
  height: ${responsiveToPx("300px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const Image = styled(CachedImage)`
  width: ${responsiveToPx("295px")};
  height: ${responsiveToPx("295px")};
  border-radius: 5px;
`;
