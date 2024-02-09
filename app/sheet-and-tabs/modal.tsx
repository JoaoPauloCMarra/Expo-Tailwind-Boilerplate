import { router } from 'expo-router';
import { View } from 'react-native';
import Button from '@/components/button';
import Text from '@/components/text';

const ModalScreen = () => {
	const isPresented = router.canGoBack();

	return (
		<View className="flex-1 items-center justify-center">
			{isPresented && <Button onPress={() => router.replace('../')}>Back</Button>}
			<Text className="text-lg font-bold">Modal</Text>
			<View className="my-8 bg-slate-900" />
		</View>
	);
};

export default ModalScreen;
