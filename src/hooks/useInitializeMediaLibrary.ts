import * as MediaLibrary from 'expo-media-library';
import { useEffect } from 'react';

/**
 * @description 사용자의 갤러리 접근 권한을 취득합니다.
 */
export const useInitializeMediaLibrary = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse?.granted, requestPermission]);
};
