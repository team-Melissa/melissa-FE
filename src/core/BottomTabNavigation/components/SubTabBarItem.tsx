import { NavButton } from '@/src/core/Button';
import { IconChat } from '@/src/icons/IconChat';
import { IconWave } from '@/src/icons/IconWave';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

const SubTabBarItem = () => {
  const router = useRouter();

  const goToTalkingPage = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  const goToChattingPage = () => {
    router.push('/chatting');
  };

  return (
    <Wrapper>
      <NavButton size="small" onPress={goToTalkingPage}>
        <IconWave />
      </NavButton>
      <NavButton size="small" onPress={goToChattingPage}>
        <IconChat />
      </NavButton>
    </Wrapper>
  );
};

export default SubTabBarItem;

const Wrapper = styled.View`
  position: absolute;
  flex-direction: row;
  padding: 3px;
  right: 30px;
  bottom: 50px;
  gap: 10px;
  border-radius: 99px;
`;
