import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const setupAndroidChannel = () => {
  return Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
};

const getNotificationPermission = async () => {
  const { status: currentStatus } = await Notifications.getPermissionsAsync();
  let status = currentStatus;

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    status = newStatus;
  }

  return status === 'granted';
};

const getEasProjectId = () => {
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  return projectId as string | undefined;
};

const getExpoPushToken = async (projectId: string) => {
  try {
    const pushToken = await Notifications.getExpoPushTokenAsync({ projectId });
    return pushToken.data;
  } catch (e) {
    Sentry.captureException(e, {
      tags: { module: 'notification' },
      extra: { projectId },
    });
  }
};

export const initializePushNotification = async () => {
  if (!Device.isDevice) return;

  if (Platform.OS === 'android') {
    await setupAndroidChannel();
  }

  const isGranted = await getNotificationPermission();
  if (!isGranted) return;

  const projectId = getEasProjectId();
  if (!projectId) return;

  const pushToken = await getExpoPushToken(projectId);
  return pushToken;
};
