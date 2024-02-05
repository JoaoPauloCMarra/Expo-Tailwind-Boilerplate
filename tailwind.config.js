import { fontFamily } from 'tailwindcss/defaultTheme';

const colorPalette = {
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

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	presets: [require('nativewind/preset')({ gapPolyfill: false })],
	theme: {
		fontFamily: {
			sans: ['Inter_400Regular', ...fontFamily.sans]
		},
		extend: {
			colors: {
				...colorPalette
			}
		}
	},
	future: {
		hoverOnlyWhenSupported: true
	},
	plugins: []
};

module.exports = config;
