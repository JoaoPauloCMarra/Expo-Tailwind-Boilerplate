import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function vibrate() {
	const haptics = require('expo-haptics');
	haptics.impactAsync();
}
