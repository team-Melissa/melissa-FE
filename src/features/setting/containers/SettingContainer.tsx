import { useGetUserSetting } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import AccountActions from '../components/AccountActions';
import SettingHeader from '../components/SettingHeader';
import SettingList from '../components/SettingList';
import { useAccountMutation } from '../hooks/mutations/useAccountMutation';
import { useUserSettingMutation } from '../hooks/mutations/useUserSettingMutation';

export default function SettingContainer() {
  const router = useRouter();
  const { data: userSetting } = useGetUserSetting();

  const updateUserSettingMutation = useUserSettingMutation();
  const { logoutMutation, deleteUserMutation } = useAccountMutation();

  const handleBackClick = () => {
    router.back();
  };

  const handleNotificationToggle = (notificationEnabled: boolean) => {
    if (!userSetting?.result || updateUserSettingMutation.isPending) return;
    updateUserSettingMutation.mutate({ data: { ...userSetting.result, notificationEnabled } });
  };

  const handleSleepTimeChange = (sleepTime: string) => {
    if (!userSetting?.result || updateUserSettingMutation.isPending) return;
    updateUserSettingMutation.mutate({ data: { ...userSetting.result, sleepTime } });
  };

  const handleNotificationTimeChange = (notificationTime: string) => {
    if (!userSetting?.result || updateUserSettingMutation.isPending) return;
    updateUserSettingMutation.mutate({ data: { ...userSetting.result, notificationTime } });
  };

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  const handleDeleteAccount = () => {
    if (deleteUserMutation.isPending) return;
    Alert.alert(
      '회원탈퇴',
      '정말 탈퇴하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '탈퇴', style: 'destructive', onPress: () => deleteUserMutation.mutate() },
      ],
      { cancelable: true }
    );
  };

  if (!userSetting?.result) return null;

  return (
    <SafeView>
      <SettingHeader onBackClick={handleBackClick} />
      <SettingList
        settingData={userSetting.result}
        onNotificationToggle={handleNotificationToggle}
        onSleepTimeChange={handleSleepTimeChange}
        onNotificationTimeChange={handleNotificationTimeChange}
      />
      <AccountActions onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />
    </SafeView>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;
