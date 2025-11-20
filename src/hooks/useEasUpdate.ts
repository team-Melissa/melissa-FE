import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

/**
 * @description EAS Update가 존재하는지 확인하고, 있으면 업데이트한 뒤 재실행합니다.
 */
export const useEasUpdate = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (__DEV__) return;
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  return isReady;
};
