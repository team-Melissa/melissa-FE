import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const setStorageValue = (key: string, value: string): void => {
  storage.set(key, value);
};

export const getStorageValue = (key: string): string | null => {
  return storage.getString(key) || null;
};
