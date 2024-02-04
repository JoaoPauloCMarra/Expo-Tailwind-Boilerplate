import { Stack } from 'expo-router';
import { View } from 'react-native';
import Input from '@/components/input';
import KeyBoardAvoidContainer from '@/components/keyboard-avoid-container';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const HomeScreen = () => {
	return (
		<>
			<Stack.Screen options={{ title: 'Home' }} />
			<KeyBoardAvoidContainer>
				<PageContainer>
					<View className="mx-auto w-full max-w-64 flex-1 items-center justify-center px-8">
						<Text size="2xl">Onboarding</Text>
						<View className="mt-2 size-32 bg-secondary" />
						<View className="w-full py-4">
							<Input keyboardType="numeric" returnKeyType="done" />
						</View>
					</View>
				</PageContainer>
			</KeyBoardAvoidContainer>
		</>
	);
};

export default HomeScreen;
