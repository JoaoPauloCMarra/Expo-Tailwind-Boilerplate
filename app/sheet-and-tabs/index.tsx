import { Stack } from 'expo-router';

const SheetAndTabsRouter = () => {
	return (
		<Stack initialRouteName="(tabs)">
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
		</Stack>
	);
};

export default SheetAndTabsRouter;
