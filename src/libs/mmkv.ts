import { MMKV } from 'react-native-mmkv';
import type { OAuthProvider } from '../types/commonTypes';

const storage = new MMKV();

const setStorageValue = (key: string, value: string): void => {
  storage.set(key, value);
};

const removeStorageValue = (key: string): void => {
  storage.delete(key);
};

export const getAccessToken = (): string | null => {
  const accessToken = storage.getString('accessToken');
  return accessToken ?? null;
};

export const setAccessToken = (accessToken: string): void => {
  setStorageValue('accessToken', accessToken);
};

export const removeAccessToken = (): void => {
  removeStorageValue('accessToken');
};

export const getOAuthProvider = (): OAuthProvider | null => {
  const oauthProvider = storage.getString('oauthProvider') as OAuthProvider;
  return oauthProvider ?? null;
};

export const setOAuthProvider = (oauthProvider: OAuthProvider) => {
  setStorageValue('oauthProvider', oauthProvider);
};

export const removeOAuthProvider = () => {
  removeStorageValue('oauthProvider');
};

export const getNotificationToken = (): string | null => {
  const notificationToken = storage.getString('notificationToken');
  return notificationToken ?? null;
};

export const setNotificationToken = (notificationToken: string) => {
  setStorageValue('notificationToken', notificationToken);
};

export const removeNotificationToken = () => {
  removeStorageValue('notificationToken');
};

export const getIsTutorialFinished = () => {
  return storage.getBoolean('isTutorialFinished') ?? false;
};

export const setIsTutorialFinished = (value: boolean) => {
  storage.set('isTutorialFinished', value);
};
