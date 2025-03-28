import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const setStorageValue = (key: string, value: string): void => {
  storage.set(key, value);
};

const removeStorageValue = (key: string): void => {
  storage.delete(key);
};

export const getAiProfileId = (): number | null => {
  const aiProfileId = storage.getNumber("aiProfileId");
  return aiProfileId ? aiProfileId : null;
};

export const setAiProfileId = (aiProfileId: number): void => {
  storage.set("aiProfileId", aiProfileId);
};

export const removeAiProfileId = (): void => {
  removeStorageValue("aiProfileId");
};

export const getAccessToken = (): string | null => {
  const accessToken = storage.getString("accessToken");
  return accessToken ? accessToken : null;
};

export const setAccessToken = (accessToken: string): void => {
  setStorageValue("accessToken", accessToken);
};

export const removeAccessToken = (): void => {
  removeStorageValue("accessToken");
};
