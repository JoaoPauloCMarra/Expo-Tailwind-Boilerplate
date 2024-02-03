import './global.css';

import { useCallback } from 'react';
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold
} from '@expo-google-fonts/inter';
import { SplashScreen, Slot } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export { default as ErrorBoundary } from '@/app/components/error-boundary';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [fontsLoaded, fontError] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<View className="flex-1 bg-slate-100">
				<Slot />
			</View>
		</SafeAreaProvider>
	);
};

export default RootLayout;
