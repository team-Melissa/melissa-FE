import { COLOR } from '@/src/constants/theme';
import { useDateSearchParams } from '@/src/hooks/useDateSearchParams';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CharacterPageHeader from '../components/CharacterPageHeader';

const CharactersContainer = () => {
  const { year, month, day } = useDateSearchParams();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <SafeView>
      <CharacterPageHeader onBackClick={handleBackClick} />
    </SafeView>
  );
};

export default CharactersContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
