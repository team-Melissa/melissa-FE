import * as Sentry from '@sentry/react-native';
import type { Purchase } from 'expo-iap';

type IapPhase = 'purchase' | 'hook' | 'verify/finish' | 'getAvailablePurchases';

export const captureIapException = (error: unknown, phase: IapPhase) => {
  Sentry.captureException(error, {
    tags: { module: 'iap' },
    extra: { phase },
  });
};

/**
 * @description 디버깅용 - purchase 값을 Sentry로 기록 (콘솔 확인 불가한 빌드용)
 * @note 디버깅 후 삭제 필수
 * @deprecated
 */
export const captureIapPurchaseLog = (purchase: Purchase) => {
  Sentry.captureMessage('iap purchase', {
    level: 'info',
    tags: { module: 'iap' },
    extra: { purchase },
  });
};
