import { useRef } from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
import { BANNER_UNIT_ID } from '../constants/adsUnitId';
import { useAdsContext } from '../hooks/useAdsContext';

type Props = ViewProps & {
  size?: BannerAdSize;
};

export const AdsBanner = ({ size, ...props }: Props) => {
  const adBannerRef = useRef<BannerAd>(null);
  const { initialized } = useAdsContext();

  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : BANNER_UNIT_ID;
  const adSize = size ?? BannerAdSize.BANNER;

  // IOS에 한해 background -> foreground 복귀 시 광고 reload
  useForeground(() => {
    if (Platform.OS === 'ios') {
      adBannerRef.current?.load();
    }
  });

  if (!initialized) return null;

  return (
    <View {...props}>
      <BannerAd ref={adBannerRef} unitId={adUnitId} size={adSize} />
    </View>
  );
};
