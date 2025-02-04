import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const setStorageValue = (key: string, value: string): void => {
  storage.set(key, value);
};

export const getStorageValue = (key: string): string | null => {
  return storage.getString(key) || null;
};

export const removeStorageValue = (key: string): void => {
  storage.delete(key);
};

export const getAiProfileId = (): number | null => {
  const aiProfileId = storage.getString("aiProfileId");
  return aiProfileId ? parseInt(aiProfileId) : null;
};

export const getAccessToken = (): string | null => {
  const accessToken = storage.getString("accessToken");
  return accessToken ? accessToken : null;
};
