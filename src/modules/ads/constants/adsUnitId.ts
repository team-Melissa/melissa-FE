import { Platform } from 'react-native';

const ANDROID_BANNER_UNIT_ID = process.env.EXPO_PUBLIC_AD_MOB_ANDROID_BANNER_UNIT_ID ?? '';
const IOS_BANNER_UNIT_ID = process.env.EXPO_PUBLIC_AD_MOB_IOS_BANNER_UNIT_ID ?? '';

export const BANNER_UNIT_ID = Platform.OS === 'android' ? ANDROID_BANNER_UNIT_ID : IOS_BANNER_UNIT_ID;
