import { Tabs } from 'expo-router';

const TabLayout = () => {
	return (
		<Tabs initialRouteName="text-tab" screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="text-tab" />
			<Tabs.Screen name="sheet-tab" />
		</Tabs>
	);
};

export default TabLayout;
