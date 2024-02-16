import { Tabs } from 'expo-router';

const TabLayout = () => (
	<Tabs initialRouteName="text-tab" screenOptions={{ headerShown: false }}>
		<Tabs.Screen name="text-tab" />
		<Tabs.Screen name="menu-tab" />
	</Tabs>
);

export default TabLayout;
