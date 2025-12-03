import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';

export const getSentryNavigationIntegration = () => {
  return Sentry.reactNavigationIntegration({
    enableTimeToInitialDisplay: !isRunningInExpoGo(),
  });
};

export const initializeSentry = (navigationIntegration: ReturnType<typeof getSentryNavigationIntegration>) => {
  if (__DEV__) return;

  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    debug: false,
    tracesSampleRate: 0.3,
    _experiments: {
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.3,
    },
    integrations: [
      Sentry.mobileReplayIntegration({
        maskAllImages: true,
        maskAllText: true,
        maskAllVectors: true,
      }),
      navigationIntegration,
    ],
    enableNativeFramesTracking: !isRunningInExpoGo(),
  });
};
