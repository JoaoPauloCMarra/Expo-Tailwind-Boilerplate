import { Platform } from 'react-native';

export const isDev = process.env.NODE_ENV === 'development';

export const isWeb = Platform.OS === 'web';
export const isIos = Platform.OS === 'ios' && !isWeb;
export const isAndroid = Platform.OS === 'android' && !isWeb;

export const defaultHitSlop = { top: 10, right: 10, bottom: 10, left: 10 };
