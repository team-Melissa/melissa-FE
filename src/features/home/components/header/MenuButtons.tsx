import { IconSetting } from '@/src/icons';
import { debounce } from '@/src/utils/debounce';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const MenuButtons = () => {
  const router = useRouter();

  const goToTutorialPage = debounce(() => {
    Alert.alert('준비중인 기능입니다.');
  });

  const goToSettingPage = () => {
    router.navigate('/(app)/setting');
  };

  return (
    <Wrapper>
      <TouchableOpacity hitSlop={5} onPress={goToTutorialPage}>
        {/* TODO: 튜토리얼 아이콘 추가 */}
      </TouchableOpacity>
      <TouchableOpacity hitSlop={5} onPress={goToSettingPage}>
        <IconSetting />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default MenuButtons;

const Wrapper = styled.View`
  flex-direction: row;
  gap: 10px;
`;
