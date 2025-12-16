import { useCreateThread } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { LargeTitle } from '@/src/core/Txt';
import type { CharacterId } from '@/src/modules/character';
import { toast } from '@/src/modules/toast';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ActionButtons from '../components/ActionButtons';
import CharacterList from '../components/CharacterList';
import CharacterPageHeader from '../components/CharacterPageHeader';
import { useCharactersQueryParams } from '../hooks/useCharactersQueryParams';

const CharactersContainer = () => {
  const { year, month, day } = useCharactersQueryParams();
  const [aiProfileId, setAiProfileId] = useState<CharacterId>(1);
  const router = useRouter();

  const createThreadMutation = useCreateThread({
    mutation: {
      onSuccess: () => {
        router.navigate(`/(app)/chatting?year=${year}&month=${month}&day=${day}&aiProfileId=${aiProfileId}`);
      },
      onError: () => {
        toast({ message: '문제가 발생했습니다.', options: { type: 'error' } });
      },
    },
  });

  const handleBackClick = () => {
    router.back();
  };

  const handleAiProfileIdChange = (aiProfileId: CharacterId) => {
    setAiProfileId(aiProfileId);
  };

  const handleChattingClick = () => {
    if (createThreadMutation.isPending) return;
    createThreadMutation.mutate({
      params: { aiProfileId, year, month, day },
    });
  };

  const handleManualDiaryClick = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  return (
    <SafeView>
      <CharacterPageHeader onBackClick={handleBackClick} />
      <StyledLargeTitle color="title">누구와 대화해 볼까요?</StyledLargeTitle>
      <CharacterList selectedId={aiProfileId} onSelectChange={handleAiProfileIdChange} />
      <ActionButtons onChattingClick={handleChattingClick} onManualDiaryClick={handleManualDiaryClick} />
    </SafeView>
  );
};

export default CharactersContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const StyledLargeTitle = styled(LargeTitle)`
  text-align: center;
  margin-bottom: 40px;
`;
