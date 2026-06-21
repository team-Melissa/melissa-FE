import { useVerifyApple, useVerifyGoogle } from '@/src/apis/_generated/serverAPI';
import * as Sentry from '@sentry/react-native';
import type { Purchase } from 'expo-iap';
import { useCallback } from 'react';
import { Platform } from 'react-native';
import { BUNDLE_IDENTIFIER } from '../constants/products';

export const useVerifyPurchase = () => {
  const verifyGoogleMutation = useVerifyGoogle();
  const verifyAppleMutation = useVerifyApple();

  const verifyGooglePurchase = useCallback(
    async (purchase: Purchase) => {
      if (verifyGoogleMutation.isPending) return;
      if (!purchase.purchaseToken) {
        throw new Error('purchase 객체에서 purchaseToken 누락');
      }

      return await verifyGoogleMutation.mutateAsync({
        data: {
          productId: purchase.productId,
          orderId: purchase.id,
          purchaseToken: purchase.purchaseToken,
          packageName: BUNDLE_IDENTIFIER,
        },
      });
    },
    [verifyGoogleMutation]
  );

  const verifyApplePurchase = useCallback(
    async (purchase: Purchase) => {
      if (verifyAppleMutation.isPending) return;

      return await verifyAppleMutation.mutateAsync({
        data: {
          productId: purchase.productId,
          transactionId: purchase.id,
          environment: __DEV__ ? 'SANDBOX' : 'PRODUCTION',
          bundleId: BUNDLE_IDENTIFIER,
        },
      });
    },
    [verifyAppleMutation]
  );

  const verifyPurchase = useCallback(
    async (purchase: Purchase) => {
      try {
        if (Platform.OS === 'android') {
          const response = await verifyGooglePurchase(purchase);
          return response?.result?.entitlement?.active;
        }
        if (Platform.OS === 'ios') {
          const response = await verifyApplePurchase(purchase);
          return response?.result?.entitlement?.active;
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: { module: 'iap' },
          extra: { productId: purchase.productId, platform: Platform.OS },
        });
      }
    },
    [verifyApplePurchase, verifyGooglePurchase]
  );

  return verifyPurchase;
};
