import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { colorPalette } from '@/lib/constants';
import Button from '@/components/button';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const DemoSlider = () => {
	const [value, setValue] = useState(0);

	return (
		<PageContainer>
			<View className="mx-auto w-full flex-1 items-center justify-center px-8">
				<Text className="mb-4 text-2xl font-bold">Demo Slider</Text>
				<Link href="/" asChild>
					<Button variant="outline" size="lg">
						Go to the Home Screen
					</Button>
				</Link>
			</View>
			<View className="mx-auto w-60 flex-1 items-center justify-center">
				<Slider
					style={{ width: '100%', height: 'auto' }}
					step={1}
					minimumValue={0}
					maximumValue={10}
					minimumTrackTintColor={colorPalette['accent-foreground']}
					maximumTrackTintColor={colorPalette.accent}
					thumbTintColor={colorPalette.primary}
					onValueChange={setValue}
					value={value}
				/>
			</View>
		</PageContainer>
	);
};

export default DemoSlider;
