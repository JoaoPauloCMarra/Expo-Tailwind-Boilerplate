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
export const styleSheetShadows = {
	large: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24
	}
};
export const backdropBgColor = 'rgba(0,0,0,0.4)';

/**
 * Update this object to change the color palette of the app.
 * Also apply same changes to the `tailwind.config.js` file.
 */
export const colorPalette = {
	background: '#F3F4F6',
	foreground: '#1F2937',
	card: '#FFFFFF',
	cardForeground: '#1F2937',
	popover: '#FFFFFF',
	'popover-foreground': '#1F2937',
	primary: '#60A5FA',
	'primary-foreground': '#1F2937',
	secondary: '#7F9CF5',
	'secondary-foreground': '#FFFFFF',
	muted: '#D1D5DB',
	'muted-foreground': '#6B7280',
	accent: '#FBBF24',
	'accent-foreground': '#1F2937',
	successful: '#10B981',
	'successful-foreground': '#FFFFFF',
	destructive: '#EF4444',
	'destructive-foreground': '#FFFFFF',
	border: '#E5E7EB',
	radius: '#F59E0B',
	input: '#D1D5DB',
	ring: '#9CA3AF'
};
