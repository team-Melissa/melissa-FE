import { Platform } from 'react-native';

type ProductType = 'consumable' | 'non-consumable' | 'subscription';

type Product = {
  productId: string;
  productType: ProductType;
};

/**
 * TODO: App Store Connect / Google Play에 등록한 실제 productId로 교체
 */
const IOS_PRODUCTS: Product[] = [
  {
    productId: 'com.melissa.premium',
    productType: 'non-consumable',
  },
];

const ANDROID_PRODUCTS: Product[] = [
  {
    productId: 'com.melissa.premium',
    productType: 'non-consumable',
  },
];

export const IAP_PRODUCTS: Product[] = Platform.select({ ios: IOS_PRODUCTS, android: ANDROID_PRODUCTS, default: [] });

export const IN_APP_PRODUCT_IDS = IAP_PRODUCTS.filter((product) => product.productType !== 'subscription').map(
  (entry) => entry.productId
);
export const SUBSCRIPTION_PRODUCT_IDS = IAP_PRODUCTS.filter((product) => product.productType === 'subscription').map(
  (entry) => entry.productId
);
