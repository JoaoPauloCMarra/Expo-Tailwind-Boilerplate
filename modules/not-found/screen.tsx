import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import Button from '@/components/button';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const NotFoundScreen = () => (
	<PageContainer>
		<Stack.Screen options={{ title: 'Oops!' }} />
		<View className="flex-1 items-center justify-center p-5">
			<Text size="2xl">This screen doesn't exist.</Text>
			<Link href="/" asChild>
				<Button variant="link">Go to home screen!</Button>
			</Link>
		</View>
	</PageContainer>
);

export default NotFoundScreen;
