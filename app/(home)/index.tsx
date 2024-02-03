import { Stack } from 'expo-router';
import { View } from 'react-native';
import Onboarding from '@/screens/onboarding';

const HomeScreen = () => {
	return (
		<>
			<Stack.Screen options={{ title: 'Home' }} />
			<View className="flex-1 items-center justify-center p-5">
				<Onboarding />
			</View>
		</>
	);
};

export default HomeScreen;
