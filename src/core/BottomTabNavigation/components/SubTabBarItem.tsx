import { NavButton } from '@/src/core/Button';
import { IconChat, IconWave } from '@/src/icons';
import { getTodayDate } from '@/src/utils/date';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

const SubTabBarItem = () => {
  const { year, month, day } = getTodayDate();
  const router = useRouter();

  const goToTalkingPage = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  const goToChattingPage = () => {
    // 채팅 버튼 클릭 시, 항상 오늘로 세팅
    router.push(`/(app)/characters?year=${year}&month=${month}&day=${day}`);
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
  flex-direction: row;
  padding: 3px;
  gap: 10px;
  border-radius: 99px;
`;
