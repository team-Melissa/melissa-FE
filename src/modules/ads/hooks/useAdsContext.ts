import { useContext } from 'react';
import { AdsContext } from '../providers/AdsProvider';

export const useAdsContext = () => {
  const context = useContext(AdsContext);

  if (!context) {
    throw new Error('<AdsProvider> 내에서만 사용 가능합니다');
  }

  return context;
};
