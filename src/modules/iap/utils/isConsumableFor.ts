import { IAP_PRODUCTS } from '../constants/products';

export const isConsumableFor = (productId: string) => {
  const productType = IAP_PRODUCTS.find((product) => product.productId === productId)?.productType;
  return productType === 'consumable';
};
