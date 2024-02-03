import { Pressable, View } from 'react-native';
import Input from '@/components/input';
import Text from '@/components/text';

const Onboarding = () => {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-2xl text-slate-700">Onboarding</Text>
			<View className="mt-2 size-32 bg-secondary" />
			<View className="w-full">
				<Input keyboardType="numeric" returnKeyType="done" />
				<Pressable
					onPress={() => {
						throw new Error('Error from Onboarding');
					}}
				>
					<Text>ERROR</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Onboarding;
