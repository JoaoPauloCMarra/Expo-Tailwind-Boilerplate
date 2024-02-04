const createExpoWebpackConfigAsync = require('@expo/webpack-config');

export default async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(
		{
			...env,
			babel: {
				dangerouslyAddModulePathsToTranspile: ['nativewind']
			}
		},
		argv
	);

	config.module.rules.push({
		test: /\.css$/i,
		use: ['postcss-loader']
	});

	return config;
}
