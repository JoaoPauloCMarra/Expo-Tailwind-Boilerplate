import { Link } from 'expo-router';
import { View } from 'react-native';
import Button from '@/components/button';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const TabDemoTextScreen = () => {
	return (
		<PageContainer>
			<View className="flex-1 flex-col gap-8 px-4">
				<View className="mx-auto w-full items-center justify-center px-8">
					<Text className="mb-4 text-2xl font-bold">Demo Text in Tabs</Text>
					<Link href="/" asChild>
						<Button variant="outline" size="lg">
							Go to the Home Screen
						</Button>
					</Link>
				</View>
				<Text>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate perferendis, minus
					ratione placeat magni quos veritatis sunt laboriosam voluptates quisquam reiciendis iure
					architecto quidem quibusdam odio necessitatibus fugiat magnam dolore.
				</Text>
			</View>
		</PageContainer>
	);
};

export default TabDemoTextScreen;
