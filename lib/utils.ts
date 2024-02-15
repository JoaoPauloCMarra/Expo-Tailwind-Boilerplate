import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isWeb } from './constants';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function vibrate(feedback?: 'light' | 'medium' | 'heavy'): Promise<void> {
	if (isWeb) return;
	const haptics = require('expo-haptics');
	return haptics.impactAsync(feedback ?? 'medium');
}
