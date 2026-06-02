import * as Sentry from '@sentry/react-native';

type IapPhase = 'purchase' | 'hook' | 'verify/finish' | 'getAvailablePurchases';

export const captureIapException = (error: unknown, phase: IapPhase) => {
  Sentry.captureException(error, {
    tags: { module: 'iap' },
    extra: { phase },
  });
};
