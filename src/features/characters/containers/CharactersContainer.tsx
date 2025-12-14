import { COLOR } from '@/src/constants/theme';
import { useDateSearchParams } from '@/src/hooks/useDateSearchParams';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import CharacterList from '../components/CharacterList';
import CharacterPageHeader from '../components/CharacterPageHeader';
import type { CharacterId } from '../types';

const CharactersContainer = () => {
  const { year, month, day } = useDateSearchParams();
  const [aiProfileId, setAiProfileId] = useState<CharacterId>(1);
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleAiProfileIdChange = (aiProfileId: CharacterId) => {
    setAiProfileId(aiProfileId);
  };

  return (
    <SafeView>
      <CharacterPageHeader onBackClick={handleBackClick} />
      <CharacterList selectedId={aiProfileId} onSelectChange={handleAiProfileIdChange} />
    </SafeView>
  );
};

export default CharactersContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
