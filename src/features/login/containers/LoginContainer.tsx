import { COLOR } from '@/src/constants/theme';
import { LoginButton } from '@/src/core/Button';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CopyrightTxt from '../components/CopyrightTxt';
import MainLogo from '../components/MainLogo';

const LoginContainer = () => {
  return (
    <SafeView>
      <LogoWrapper>
        <MainLogo />
      </LogoWrapper>
      <Wrapper>
        <LoginButton provider="KAKAO" onPress={() => {}}>
          Kakao로 시작하기
        </LoginButton>
        <LoginButton provider="GOOGLE" onPress={() => {}}>
          Google로 시작하기
        </LoginButton>
        {Platform.OS === 'ios' && (
          <LoginButton provider="APPLE" onPress={() => {}}>
            Apple로 시작하기
          </LoginButton>
        )}
        <StyledCopyrightTxt />
      </Wrapper>
    </SafeView>
  );
};

export default LoginContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;

const LogoWrapper = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  gap: ${responsiveToPx('15px')};
`;

const StyledCopyrightTxt = styled(CopyrightTxt)`
  margin-top: ${responsiveToPx('30px')};
`;
