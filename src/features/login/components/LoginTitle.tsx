import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";

export default function LoginTitle() {
  return (
    <StyledBox>
      <Image source={require("@/assets/images/logo.svg")} contentFit="contain" />
      <MelissaText>Melissa</MelissaText>
      <TitleText>하루의 끝, 멜리사</TitleText>
    </StyledBox>
  );
}

const StyledBox = styled.View`
  align-self: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${responsiveToPx("340px")};
  gap: ${responsiveToPx("8px")};
`;

const Image = styled(Img)`
  width: ${responsiveToPx("88px")};
  height: ${responsiveToPx("70px")};
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.deepGreen};
`;

const MelissaText = styled(TitleText)`
  font-family: ${({ theme }) => theme.fontFamily.poetsenOne};
  font-size: ${({ theme }) => theme.fontSize.xxxxl};
`;
