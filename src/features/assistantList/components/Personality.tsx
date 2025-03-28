import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

type PersonalityProps = {
  feat1: string;
  feat2: string;
  feat3: string;
};

export default function Personality({ feat1, feat2, feat3 }: PersonalityProps) {
  return (
    <PersonalityBox>
      <LineBox>
        <Title>·</Title>
        <Description numberOfLines={1}>{feat1}</Description>
      </LineBox>
      <LineBox>
        <Title>·</Title>
        <Description numberOfLines={1}>{feat2}</Description>
      </LineBox>
      <LineBox>
        <Title>·</Title>
        <Description numberOfLines={1}>{feat3}</Description>
      </LineBox>
    </PersonalityBox>
  );
}

const PersonalityBox = styled.View`
  width: 100%;
  padding-left: ${responsiveToPx("20px")};
  padding-right: ${responsiveToPx("20px")};
  background-color: transparent;
  justify-content: center;
  gap: ${({ theme }) => theme.gap.md};
`;

const LineBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.sm};
`;

const Title = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.white};
  margin-right: ${responsiveToPx("2px")};
`;

const Description = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 1;
`;
