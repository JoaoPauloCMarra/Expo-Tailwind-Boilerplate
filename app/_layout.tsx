import './global.css';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import NetInfo from '@react-native-community/netinfo';
import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import { useLocales } from 'expo-localization';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider } from 'jotai';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colorPalette, type Locale } from '@/lib/constants';
import { loadLocale } from '@/lib/i18n';
import Text from '@/components/text';
import useTranslations from '@/hooks/use-translations';
export { default as ErrorBoundary } from '@/components/error-boundary';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected);
	});
});

const AppPreloader = ({ children }: PropsWithChildren) => {
	const [{ languageCode }] = useLocales();
	const { setLocale } = useTranslations();

	const [fontsLoaded, fontError] = useFonts({
		Inter_400Regular
	});

	useEffect(() => {
		if (!fontsLoaded || !languageCode) return;
		loadLocale(languageCode as Locale).then(async (dictionary) => {
			setLocale({ locale: languageCode as Locale, dictionary });
			await SplashScreen.hideAsync();
		});
	}, [fontError, fontsLoaded, languageCode, setLocale]);

	if (fontError) {
		return (
			<View className="size-full flex-1 items-center justify-center bg-background">
				<Text>{String(fontError.message)}</Text>
				<Text>{String(fontError.cause)}</Text>
				<Text>{String(fontError.stack)}</Text>
			</View>
		);
	}

	if (!fontsLoaded || !languageCode) {
		return null;
	}

	return children;
};

const RootLayout = () => (
	<SafeAreaProvider>
		<QueryClientProvider client={queryClient}>
			<JotaiProvider>
				<AppPreloader>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<StatusBar
							animated
							backgroundColor="transparent"
							networkActivityIndicatorVisible
							translucent
							style="dark"
						/>
						<Stack
							initialRouteName="/"
							screenOptions={{
								headerShown: false,
								contentStyle: {
									backgroundColor: colorPalette.background
								}
							}}
						/>
					</GestureHandlerRootView>
				</AppPreloader>
			</JotaiProvider>
		</QueryClientProvider>
	</SafeAreaProvider>
);

export default RootLayout;
