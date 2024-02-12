const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
	isCSSEnabled: true
});

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
config.watchFolders = [workspaceRoot];
config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, 'node_modules'),
	path.resolve(workspaceRoot, 'node_modules')
];

module.exports = withNativeWind(config, {
	input: './app/global.css',
	projectRoot,
	inlineRem: false
});
