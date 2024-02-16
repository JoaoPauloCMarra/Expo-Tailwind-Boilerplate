import { useActionSheet } from '@expo/react-native-action-sheet';
import { Link } from 'expo-router';
import { View } from 'react-native';
import Button from '@/components/button';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const TabDemoMenu = () => {
	const { showActionSheetWithOptions } = useActionSheet();

	const onPress = () => {
		const options = ['Delete', 'Save', 'Cancel'];
		const destructiveButtonIndex = 0;
		const cancelButtonIndex = 2;

		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				destructiveButtonIndex
			},
			(selectedIndex) => {
				switch (selectedIndex) {
					case 1:
						// Save
						break;

					case destructiveButtonIndex:
						// Delete
						break;

					case cancelButtonIndex:
					// Canceled
				}
			}
		);
	};

	return (
		<PageContainer>
			<View className="flex-1 flex-col gap-8 px-4">
				<View className="mx-auto w-full items-center justify-center px-8">
					<Text className="mb-4 text-2xl font-bold">Demo tab with Menu</Text>
					<Link href="/" asChild>
						<Button variant="outline" size="lg">
							Go to the Home Screen
						</Button>
					</Link>
				</View>
				<View>
					<Button onPress={onPress}>Menu</Button>
				</View>
			</View>
		</PageContainer>
	);
};

export default TabDemoMenu;
