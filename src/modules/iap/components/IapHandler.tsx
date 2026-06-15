import { getGetMyEntitlementsQueryKey } from '@/src/apis/_generated/serverAPI';
import * as Sentry from '@sentry/react-native';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorCode, useIAP, type Purchase } from 'expo-iap';
import { useCallback, useEffect, useRef } from 'react';
import { useVerifyPurchase } from '../services/useVerifyPurchase';
import { isConsumableFor } from '../utils/isConsumableFor';

export const IapHandler = () => {
  const claimedIdsRef = useRef<string[]>([]);
  const queryClient = useQueryClient();

  const verifyPurchase = useVerifyPurchase();

  const { connected, availablePurchases, finishTransaction, getAvailablePurchases } = useIAP({
    // 신규 결제 + iOS 미완료 트랜잭션 재생
    onPurchaseSuccess: (purchase) => {
      fulfillPurchase(purchase);
    },
    onPurchaseError: (error) => {
      if (error.code !== ErrorCode.UserCancelled) {
        Sentry.captureException(error, {
          tags: { module: 'iap' },
          extra: { phase: 'hook/onPurchaseError' },
        });
      }
    },
    onError: (error) => {
      Sentry.captureException(error, {
        tags: { module: 'iap' },
        extra: { phase: 'hook/onError' },
      });
    },
  });

  const fulfillPurchase = useCallback(
    async (purchase: Purchase) => {
      if (claimedIdsRef.current.includes(purchase.id)) return;
      claimedIdsRef.current.push(purchase.id);

      const isVerify = await verifyPurchase(purchase);
      if (!isVerify) return;

      await finishTransaction({
        purchase,
        isConsumable: isConsumableFor(purchase.productId),
      });

      queryClient.invalidateQueries({
        queryKey: getGetMyEntitlementsQueryKey(),
      });
    },
    [finishTransaction, verifyPurchase, queryClient]
  );

  // 앱 시작 시 미완료 구매 조회
  useEffect(() => {
    if (!connected) return;
    getAvailablePurchases().catch((error) => {
      Sentry.captureException(error, {
        tags: { module: 'iap' },
        extra: { phase: 'getAvailablePurchases' },
      });
    });
  }, [connected, getAvailablePurchases]);

  useEffect(() => {
    availablePurchases.forEach((purchase) => fulfillPurchase(purchase));
  }, [availablePurchases, fulfillPurchase]);

  return null;
};
