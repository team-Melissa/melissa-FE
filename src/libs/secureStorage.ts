import * as SecureStore from "expo-secure-store";

const setSecureValue = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("secureStore에 저장 성공");
  } catch (e) {
    console.error("secureStore에 저장 실패", e);
  }
};

const getSecureValue = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.error("secureStore에서", key, "가져오지 못 함", e);
    return null;
  }
};

const removeSecureValue = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("secureStore에서 ", key, "삭제 성공");
  } catch (e) {
    console.error("secureStore에서", key, "삭제 실패", e);
  }
};

export const setRefreshToken = async (refreshToken: string): Promise<void> => {
  return setSecureValue("refreshToken", refreshToken);
};

export const getRefreshToken = async (): Promise<string | null> => {
  return getSecureValue("refreshToken");
};

export const removeRefreshToken = async (): Promise<void> => {
  return removeSecureValue("refreshToken");
};
