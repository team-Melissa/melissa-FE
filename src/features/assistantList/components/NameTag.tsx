import styled from "styled-components/native";

type NameTagProps = {
  name: string;
  tag1: string;
  tag2: string;
};

export default function NameTag({ name, tag1, tag2 }: NameTagProps) {
  return (
    <NameTagBox>
      <NameText>{name}</NameText>
      <TagText>
        {tag1} {tag2}
      </TagText>
    </NameTagBox>
  );
}

const NameTagBox = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => theme.gap.base};
`;

const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
`;

const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.white};
`;
