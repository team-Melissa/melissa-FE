import { shadowProps } from "@/src/constants/shadowProps";
import styled from "styled-components/native";

type Props = {
  isPrevLoginProvider: boolean;
};

export default function PrevLoginBadge({ isPrevLoginProvider }: Props) {
  if (!isPrevLoginProvider) return null;

  return (
    <BadgeWrapper style={shadowProps}>
      <BadgeText>최근 로그인</BadgeText>
    </BadgeWrapper>
  );
}

const BadgeWrapper = styled.View`
  position: absolute;
  top: -12px;
  right: -12px;
  padding: 4px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.deepGreen};
`;

const BadgeText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
