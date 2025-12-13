import { IconSearch, IconSetting } from '@/src/icons';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const MenuButtons = () => {
  const router = useRouter();

  const goToSearchPage = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  const goToSettingPage = () => {
    router.push('/(app)/setting');
  };

  return (
    <Wrapper>
      <TouchableOpacity hitSlop={5} onPress={goToSearchPage}>
        <IconSearch />
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
