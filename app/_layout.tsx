import './global.css';

import { useCallback } from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import NetInfo from '@react-native-community/netinfo';
import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider } from 'jotai';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
			<QueryClientProvider client={queryClient}>
				<JotaiProvider>
					<View className="size-full flex-1 bg-background">
						<StatusBar
							animated
							backgroundColor="transparent"
							networkActivityIndicatorVisible
							translucent
							style="dark"
						/>
						<SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
							<Stack
								initialRouteName="/"
								screenOptions={{
									headerShown: false,
									contentStyle: {
										backgroundColor: 'transparent'
									}
								}}
							/>
						</SafeAreaView>
					</View>
				</JotaiProvider>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};

export default RootLayout;
