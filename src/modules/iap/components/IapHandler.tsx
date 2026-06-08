import { ErrorCode, useIAP, type Purchase } from 'expo-iap';
import { useCallback, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { verifyPurchase } from '../services/verifyPurchase';
import { captureIapException, captureIapPurchaseLog } from '../utils/captureException';
import { isConsumableFor } from '../utils/isConsumableFor';

export const IapHandler = () => {
  const claimedIdsRef = useRef<string[]>([]);

  const { connected, availablePurchases, finishTransaction, getAvailablePurchases } = useIAP({
    // 신규 결제 + iOS 미완료 트랜잭션 재생
    onPurchaseSuccess: (purchase) => {
      fulfillPurchase(purchase);
    },
    onPurchaseError: (error) => {
      if (error.code !== ErrorCode.UserCancelled) {
        captureIapException(error, 'purchase');
      }
    },
    onError: (error) => {
      captureIapException(error, 'hook');
    },
  });

  const fulfillPurchase = useCallback(
    async (purchase: Purchase) => {
      // TODO: 디버깅 후 삭제 필수
      Alert.alert('purchase', JSON.stringify(purchase, null, 2));
      captureIapPurchaseLog(purchase);

      if (claimedIdsRef.current.includes(purchase.id)) return;
      claimedIdsRef.current.push(purchase.id);

      try {
        const { isValid } = await verifyPurchase(purchase);
        if (!isValid) return;
        // TODO: verifyPurchase 성공 후, 광고 제거 유무 query invalidate
        await finishTransaction({ purchase, isConsumable: isConsumableFor(purchase.productId) });
      } catch (error) {
        claimedIdsRef.current = claimedIdsRef.current.filter((id) => id !== purchase.id);
        captureIapException(error, 'verify/finish');
      }
    },
    [finishTransaction]
  );

  // 앱 시작 시 미완료 구매 조회
  useEffect(() => {
    if (!connected) return;
    getAvailablePurchases().catch((error) => captureIapException(error, 'getAvailablePurchases'));
  }, [connected, getAvailablePurchases]);

  useEffect(() => {
    availablePurchases.forEach((purchase) => fulfillPurchase(purchase));
  }, [availablePurchases, fulfillPurchase]);

  return null;
};
