/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	presets: [require('nativewind/preset')({ gapPolyfill: false })],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				tertiary: 'var(--color-tertiary)',
				link: 'var(--color-link)'
			}
		}
	},
	future: {
		hoverOnlyWhenSupported: true
	},
	plugins: []
};
