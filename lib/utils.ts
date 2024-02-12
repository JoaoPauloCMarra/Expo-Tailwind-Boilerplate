import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isWeb } from './constants';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function vibrate() {
	if (isWeb) return;
	const haptics = require('expo-haptics');
	haptics.impactAsync();
}
