import { getCheckNewUserQueryKey, useCreateDefaultUserSetting } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import IntroAnimationView from '../components/IntroAnimationView';

const IntroContainer = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createDefaultUserSettingMutation = useCreateDefaultUserSetting();

  const handleIntroFinish = () => {
    if (createDefaultUserSettingMutation.isPending) return;
    createDefaultUserSettingMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCheckNewUserQueryKey() });
        router.replace('/(app)');
      },
      onError: () => {
        router.replace('/login');
      },
    });
  };

  return (
    <Wrapper>
      <IntroAnimationView onFinish={handleIntroFinish} />
    </Wrapper>
  );
};

export default IntroContainer;

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.black};
`;
