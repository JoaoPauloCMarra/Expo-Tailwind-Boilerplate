module.exports = {
	preset: '@testing-library/react-native',
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-navigation/native|react-native-reanimated|@expo/html-elements|@react-native(-community)?)/)'
	],
	setupFilesAfterEnv: [
		'<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
		'<rootDir>/jest.setup.js'
	],
	moduleNameMapper: {
		'@/(.*)': ['<rootDir>/$1']
	}
};
