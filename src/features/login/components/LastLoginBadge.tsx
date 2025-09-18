import { shadowProps } from "@/src/constants/shadowProps";
import { getOAuthProvider } from "@/src/libs/mmkv";
import styled from "styled-components/native";
import { loginProviderLabels } from "../constants";

export default function LastLoginBadge() {
  const lastLoginProvider = getOAuthProvider();

  if (!lastLoginProvider) return null;

  return (
    <Wrapper>
      <BadgeWrapper style={shadowProps}>
        <BadgeText>
          마지막에 <BoldTxt>{loginProviderLabels[lastLoginProvider]}</BoldTxt>로 로그인했어요.
        </BadgeText>
      </BadgeWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  padding: 24px 0;
`;

const BadgeWrapper = styled.View`
  padding: 10px 25px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

const BadgeText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const BoldTxt = styled(BadgeText)`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
`;
