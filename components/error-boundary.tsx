import { memo } from 'react';
import { type ErrorBoundaryProps, router } from 'expo-router';
import { View } from 'react-native';
import Button from './button';
import PageContainer from './page-container';
import Text from './text';

type Props = Omit<ErrorBoundaryProps, 'retry'> & {
	retry?: ErrorBoundaryProps['retry'];
};

const ErrorBoundary = (props: Props) => (
	<PageContainer>
		<View className="flex-1 items-center justify-center">
			<Text variant="destructive" size="2xl">
				{String(props.error.message)}
			</Text>
			<View className="flex items-center justify-center pt-8">
				<Button onPress={props.retry} variant="destructive" size="lg">
					Retry
				</Button>
				<Text className="w-full py-4 text-center">or</Text>
				<Button variant="outline" size="lg" onPress={() => router.replace('/')}>
					Go to the Home Screen
				</Button>
			</View>
		</View>
	</PageContainer>
);

export default memo(ErrorBoundary);
