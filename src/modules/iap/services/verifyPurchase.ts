import * as Sentry from '@sentry/react-native';
import type { Purchase } from 'expo-iap';
import { Platform } from 'react-native';
import { axiosInstance } from '../../axios/instances/instance';

type VerifyPurchaseResult = {
  isValid: boolean;
};

// TODO: 백엔드 API 스펙에 맞게 수정 필요 (Android/IOS 분기 필요할 예정, React Query Mutation으로 처리 예정)
export const verifyPurchase = async (purchase: Purchase): Promise<VerifyPurchaseResult> => {
  try {
    const { data } = await axiosInstance.post('/payments/verify', {
      platform: Platform.OS,
      productId: purchase.productId,
      purchaseToken: purchase.purchaseToken,
    });

    return { isValid: Boolean(data?.result?.valid) };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { module: 'iap' },
      extra: { productId: purchase.productId, platform: Platform.OS },
    });
  }

  if (__DEV__) {
    console.warn(`[iap] verifyPurchase 실패 — 검증 API 호출에 실패했습니다. productId=${purchase.productId}`);
  }

  return { isValid: false };
};
