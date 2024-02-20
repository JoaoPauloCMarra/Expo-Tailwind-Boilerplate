import { useRef, useState } from 'react';
import { Camera, CameraType, ImageType } from 'expo-camera';
import { isDevice } from 'expo-device';
import { Link } from 'expo-router';
import { ActivityIndicator, Image, View } from 'react-native';
import { vibrate } from '@/lib/utils';
import Button from '@/components/button';
import ErrorBoundary from '@/components/error-boundary';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const DemoCamera = () => {
	const [cameraReady, setCameraReady] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [picture, setPicture] = useState<string | null>(null);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef<Camera>(null);

	if (!isDevice) {
		return <ErrorBoundary error={Error('This screen only works on a real device')} />;
	}

	function toggleCameraType() {
		vibrate();
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	}

	function snapPhoto() {
		if (!cameraRef.current) return;
		vibrate();
		cameraRef.current.takePictureAsync({
			imageType: ImageType.jpg,
			quality: 1,
			// skipProcessing: true,
			scale: 1,
			onPictureSaved: ({ uri }) => setPicture(uri)
		});
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
							<ActivityIndicator size="large" className="bg-black text-white" />
						</View>
					) : null}
					<Camera
						ref={cameraRef}
						type={type}
						onCameraReady={() => setCameraReady(true)}
						style={{
							flex: 1,
							width: '100%',
							height: '100%',
							opacity: cameraReady ? 1 : 0
						}}
					>
						{picture ? (
							<View className="relative size-full bg-black/50">
								<View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-primary">
									<View className="size-80 bg-background shadow">
										<Image source={{ uri: picture }} className="size-full" resizeMode="cover" />
										<View className="absolute right-1 top-1">
											<Button onPress={() => setPicture(null)}>close</Button>
										</View>
									</View>
								</View>
							</View>
						) : null}
						<View className="absolute bottom-1 right-1 gap-4">
							<Button onPress={toggleCameraType} variant="secondary">
								Flip Camera
							</Button>
							<Button onPress={snapPhoto} variant="secondary">
								Snap Photo
							</Button>
						</View>
					</Camera>
				</View>
			</View>
		</PageContainer>
	);
};

export default DemoCamera;
