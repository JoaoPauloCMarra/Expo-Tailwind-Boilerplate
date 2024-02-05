module.exports = {
	preset: '@testing-library/react-native',
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|react-native-reanimated|@react-navigation/native|@react-native(-community)?)/)'
	],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'@/(.*)': ['<rootDir>/$1']
	}
};
