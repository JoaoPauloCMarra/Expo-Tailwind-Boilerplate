import { Platform } from 'react-native';

export const isDev = process.env.NODE_ENV === 'development';

export const isWeb = Platform.OS === 'web';
export const isIos = Platform.OS === 'ios' && !isWeb;
export const isAndroid = Platform.OS === 'android' && !isWeb;

export const LOCALE_COOKIES_KEY = 'appLocale';
export const SUPPORTED_LOCALES = ['en', 'pt'] as const;
export const DEFAULT_LOCALE = 'en';
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type Dictionary = Record<string, Record<string, string>>;

export const defaultHitSlop = { top: 10, right: 10, bottom: 10, left: 10 };
