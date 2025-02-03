import * as SecureStore from "expo-secure-store";

export const setSecureValue = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("secureStore에 저장 성공");
  } catch (e) {
    console.error("secureStore에 저장 실패", e);
  }
};

export const getSecureValue = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.error("secureStore에서", key, "가져오지 못 함", e);
    return null;
  }
};

export const removeSecureValue = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("secureStore에서 ", key, "삭제 성공");
  } catch (e) {
    console.error("secureStore에서", key, "삭제 실패", e);
  }
};
