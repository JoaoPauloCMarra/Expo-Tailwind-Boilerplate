import './global.css';

import { useCallback } from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import NetInfo from '@react-native-community/netinfo';
import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export { default as ErrorBoundary } from '@/components/error-boundary';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected);
	});
});

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
			<QueryClientProvider client={queryClient}>
				<Stack
					initialRouteName="/"
					screenOptions={{
						headerShown: false,
						contentStyle: {
							backgroundColor: '#0f0f0f'
						}
					}}
				/>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};

export default RootLayout;
