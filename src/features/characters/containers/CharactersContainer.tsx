import { useCreateThread } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { LargeTitle } from '@/src/core/Txt';
import { AdsBanner } from '@/src/modules/ads';
import type { CharacterId } from '@/src/modules/character';
import { toast } from '@/src/modules/toast';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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
  const createThreadMutation = useCreateThread();

  const handleBackClick = () => {
    router.back();
  };

  const handleAiProfileIdChange = (aiProfileId: CharacterId) => {
    setAiProfileId(aiProfileId);
  };

  const handleCreateThreadAndNavigate = () => {
    if (createThreadMutation.isPending) return;
    createThreadMutation.mutate(
      { params: { aiProfileId, year, month, day } },
      {
        onSuccess: () => {
          router.navigate(`/(app)/chatting?year=${year}&month=${month}&day=${day}&aiProfileId=${aiProfileId}`);
        },
        onError: () => {
          toast({ message: '문제가 발생했습니다.', options: { type: 'error' } });
        },
      }
    );
  };

  const handleManualDiaryClick = () => {
    router.navigate(`/(app)/write-diary?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <SafeView>
      <CharacterPageHeader onBackClick={handleBackClick} />
      <StyledLargeTitle color="title">누구와 대화해 볼까요?</StyledLargeTitle>
      <CharacterList
        selectedId={aiProfileId}
        onSelectChange={handleAiProfileIdChange}
        onCharacterClick={handleCreateThreadAndNavigate}
      />
      <BottomSection>
        <AdsBanner style={{ alignItems: 'center' }} />
        <ActionButtons onChattingClick={handleCreateThreadAndNavigate} onManualDiaryClick={handleManualDiaryClick} />
      </BottomSection>
    </SafeView>
  );
};

export default CharactersContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
  gap: 20px;
`;

const BottomSection = styled.View`
  gap: 20px;
  margin-top: auto;
`;

const StyledLargeTitle = styled(LargeTitle)`
  text-align: center;
`;
