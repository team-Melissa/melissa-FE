import { COLOR, SHADOW } from '@/src/constants/theme';
import { Description1, Description2 } from '@/src/core/Txt';
import { getOAuthProvider } from '@/src/libs/mmkv';
import type { OAuthProvider } from '@/src/types/commonTypes';
import styled from 'styled-components/native';

const label = {
  KAKAO: 'Kakao',
  GOOGLE: 'Google',
  APPLE: 'Apple',
} satisfies Record<OAuthProvider, string>;

export default function LastLoginBadge() {
  const lastLoginProvider = getOAuthProvider();

  if (!lastLoginProvider) return null;

  return (
    <Wrapper style={SHADOW}>
      <Description2>
        마지막에 <Description1>{label[lastLoginProvider]}</Description1>로 로그인했어요.
      </Description2>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  padding: 10px 20px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: ${COLOR.white};
`;
