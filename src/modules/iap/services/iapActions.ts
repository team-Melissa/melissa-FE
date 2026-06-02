import type { Product, ProductSubscription } from 'expo-iap';
import { fetchProducts, getAvailablePurchases, requestPurchase } from 'expo-iap';
import { IN_APP_PRODUCT_IDS, SUBSCRIPTION_PRODUCT_IDS } from '../constants/products';

/**
 * @description 소모/비소모성 상품 목록 조회 (가격 표시용)
 */
export const getInAppProducts = async () => {
  if (IN_APP_PRODUCT_IDS.length === 0) return [];
  const products = await fetchProducts({ skus: IN_APP_PRODUCT_IDS, type: 'in-app' });
  return (products ?? []) as Product[];
};

/**
 * @description 구독 상품 목록 조회
 * @android offerToken은 각 상품의 offer 상세에 존재
 */
export const getSubscriptionProducts = async () => {
  if (SUBSCRIPTION_PRODUCT_IDS.length === 0) return [];
  const subscriptions = await fetchProducts({ skus: SUBSCRIPTION_PRODUCT_IDS, type: 'subs' });
  return (subscriptions ?? []) as ProductSubscription[];
};

/**
 * @description 소모/비소모성 상품 구매
 * @param productId 상품 id
 */
export const purchaseInAppProduct = async (productId: string) => {
  return await requestPurchase({
    type: 'in-app',
    request: {
      apple: { sku: productId },
      google: { skus: [productId] },
    },
  });
};

/**
 * @description 구독 구매
 * @param productId 상품 id
 * @param offerTokenAndroid 안드로이드에서 필요한 offerToken
 */
export const purchaseSubscriptionProduct = async (productId: string, offerTokenAndroid?: string) => {
  const subscriptionOffers = offerTokenAndroid ? [{ sku: productId, offerToken: offerTokenAndroid }] : [];
  return await requestPurchase({
    type: 'subs',
    request: {
      apple: {
        sku: productId,
      },
      google: {
        skus: [productId],
        subscriptionOffers,
      },
    },
  });
};

/**
 * @description 구매 복원 로직
 */
export const restoreIapPurchases = async () => {
  return await getAvailablePurchases({ alsoPublishToEventListenerIOS: true });
};
