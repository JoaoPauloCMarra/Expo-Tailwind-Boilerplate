import './global.css';

import { useCallback } from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export { default as ErrorBoundary } from '@/app/components/error-boundary';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [fontsLoaded, fontError] = useFonts({
		Inter_400Regular
	});

	const onLayoutRootView = useCallback(() => {
		if (fontsLoaded || fontError) {
			setTimeout(async () => {
				await SplashScreen.hideAsync();
			});
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<StatusBar
				animated
				backgroundColor="#0f0f0f"
				networkActivityIndicatorVisible
				translucent
				style="light"
			/>
			<Slot />
		</SafeAreaProvider>
	);
};

export default RootLayout;
