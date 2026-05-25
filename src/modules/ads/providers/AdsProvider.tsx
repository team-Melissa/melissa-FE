import * as Sentry from '@sentry/react-native';
import {
  getTrackingPermissionsAsync,
  PermissionStatus,
  requestTrackingPermissionsAsync,
} from 'expo-tracking-transparency';
import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import mobileAds from 'react-native-google-mobile-ads';

type ContextValue = {
  initialized: boolean;
};

export const AdsContext = createContext<ContextValue | null>(null);

export const AdsProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await getTrackingPermissionsAsync();

        if (status === PermissionStatus.UNDETERMINED) {
          await requestTrackingPermissionsAsync();
        }

        await mobileAds().initialize();
        setInitialized(true);
      } catch (e) {
        Sentry.captureException(e, {
          tags: {
            module: 'ads',
          },
        });
      }
    })();
  }, []);

  return <AdsContext.Provider value={{ initialized }}>{children}</AdsContext.Provider>;
};
