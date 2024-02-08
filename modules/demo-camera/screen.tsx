import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Link } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import Button from '@/components/button';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const DemoCamera = () => {
	const [cameraReady, setCameraReady] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	function toggleCameraType() {
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	}

	if (permission?.status !== 'granted') {
		requestPermission();
	}

	return (
		<PageContainer>
			<View className="mx-auto w-full items-center justify-center px-8">
				<Text className="mb-4 text-2xl font-bold">
					{`Camera Demo | Permission: ${permission?.status}`}
				</Text>
				<Link href="/" asChild>
					<Button variant="outline" size="lg">
						Go to the Home Screen
					</Button>
				</Link>
			</View>
			<View className="w-full flex-1 p-4">
				<View className="size-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-slate-900">
					{!cameraReady ? (
						<View className="flex-1 justify-end">
							<ActivityIndicator size="large" />
						</View>
					) : null}
					<Camera
						type={type}
						onCameraReady={() => setCameraReady(true)}
						style={{ flex: 1, width: '100%', height: '100%', opacity: cameraReady ? 1 : 0 }}
					>
						<View className="absolute bottom-1 right-1">
							<Button onPress={toggleCameraType} variant="secondary">
								Flip Camera
							</Button>
						</View>
					</Camera>
				</View>
			</View>
		</PageContainer>
	);
};

export default DemoCamera;
