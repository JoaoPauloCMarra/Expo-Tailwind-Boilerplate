import { useState } from 'react';
import { Link } from 'expo-router';
import { View } from 'react-native';
import BottomSheet from '@/components/bottom-sheet';
import Button from '@/components/button';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const TabLayout = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<PageContainer>
				<View className="flex-1 flex-col gap-8 px-4">
					<View className="mx-auto w-full items-center justify-center px-8">
						<Text className="mb-4 text-2xl font-bold">Demo Sheet</Text>
						<Link href="/" asChild>
							<Button variant="outline" size="lg">
								Go to the Home Screen
							</Button>
						</Link>
					</View>
					<View>
						<Button onPress={() => setShowModal(true)}>Open Bottom Sheet</Button>
					</View>
				</View>
			</PageContainer>

			<BottomSheet visible={showModal} onClose={() => setShowModal(false)}>
				<View className="flex-1 items-center justify-center">
					<Button onPress={() => setShowModal(false)}>Close</Button>
					<Text className="text-lg font-bold">Bottom Sheet Demo</Text>
					<View className="my-8 size-32 rounded-full bg-slate-900" />
				</View>
			</BottomSheet>
		</>
	);
};

export default TabLayout;
