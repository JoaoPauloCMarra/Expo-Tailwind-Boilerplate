import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	presets: [require('nativewind/preset')({ gapPolyfill: false })],
	theme: {
		fontFamily: {
			sans: ['Inter_400Regular', ...fontFamily.sans]
		},
		extend: {
			colors: {
				background: '#0f0f0f',
				foreground: '#fafafa',
				card: '#0f0f0f',
				cardForeground: '#fafafa',
				popover: '#0f0f0f',
				popoverForeground: '#fafafa',
				primary: '#fafafa',
				primaryForeground: '#1e1e1e',
				secondary: '#252525',
				secondaryForeground: '#fafafa',
				muted: '#252525',
				mutedForeground: '#a3a3a3',
				accent: '#252525',
				accentForeground: '#fafafa',
				successful: '#3a9c5b',
				successfulForeground: '#a6e1b9',
				destructive: '#9c1f1f',
				destructiveForeground: '#fafafa',
				border: '#252525',
				radius: '#804d00',
				input: '#252525',
				ring: '#d4d4d4'
			}
		}
	},
	future: {
		hoverOnlyWhenSupported: true
	},
	plugins: []
};

module.exports = config;
