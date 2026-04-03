import { IconSetting } from '@/src/icons';
import { IconQuestion } from '@/src/icons/IconQuestion';
import { debounce } from '@/src/utils/debounce';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const MenuButtons = () => {
  const router = useRouter();

  const goToTutorialPage = debounce(() => {
    router.navigate('/(app)/tutorial');
  });

  const goToSettingPage = () => {
    router.navigate('/(app)/setting');
  };

  return (
    <Wrapper>
      <TouchableOpacity hitSlop={5} onPress={goToTutorialPage}>
        <IconQuestion color="#6C5244" />
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
  align-items: center;
  gap: 10px;
`;
