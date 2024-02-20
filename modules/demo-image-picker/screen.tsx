import { useState } from 'react';
import { isDevice } from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { Image, View } from 'react-native';
import { vibrate } from '@/lib/utils';
import Button from '@/components/button';
import ErrorBoundary from '@/components/error-boundary';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const DemoImagePicker = () => {
	const [image, setImage] = useState<string | null>(null);
	const [permission, requestPermission] = ImagePicker.useCameraPermissions();

	if (!isDevice) {
		return <ErrorBoundary error={Error('This screen only works on a real device')} />;
	}

	if (!permission?.granted) {
		requestPermission();
	}

	const pickImage = async () => {
		vibrate();
		setImage(null);
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [9, 16],
			quality: 1
		});

		if (!result.canceled && result.assets.length) {
			setImage(result.assets[0].uri);
			return;
		}
		vibrate();
	};

	return (
		<PageContainer>
			<View className="mx-auto w-full items-center justify-center px-8">
				<Text className="mb-4 text-2xl font-bold">
					{`Image Picker Demo | Permission: ${permission?.status}`}
				</Text>
				<Link href="/" asChild>
					<Button variant="outline" size="lg">
						Go to the Home Screen
					</Button>
				</Link>
			</View>
			<View className="w-full flex-1 items-center justify-center p-4">
				<View className="mb-8">
					<Button onPress={pickImage}>Pick an image from camera roll</Button>
				</View>
				{image ? (
					<View className="overflow-hidden rounded-lg p-2">
						<View className="bg-background shadow">
							<Image source={{ uri: image }} className="size-80" />
						</View>
					</View>
				) : null}
			</View>
		</PageContainer>
	);
};

export default DemoImagePicker;
