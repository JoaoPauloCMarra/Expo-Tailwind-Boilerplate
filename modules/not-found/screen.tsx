import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import Text from '@/components/text';

const NotFoundScreen = () => (
	<>
		<Stack.Screen options={{ title: 'Oops!' }} />
		<View className="flex-1 items-center justify-center p-5">
			<Text size="2xl">This screen doesn't exist.</Text>
			<Link href="/" className="mt-4 py-4">
				<Text variant="secondary">Go to home screen!</Text>
			</Link>
		</View>
	</>
);

export default NotFoundScreen;
