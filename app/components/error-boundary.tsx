import { Text, View } from 'react-native';
import Button from './button';
import type { ErrorBoundaryProps } from 'expo-router';

const ErrorBoundary = (props: ErrorBoundaryProps) => {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-lg text-red-500">{props.error.message}</Text>
			<Button onPress={props.retry}>
				<Text className="text-lg text-red-600">Retry</Text>
			</Button>
		</View>
	);
};

export default ErrorBoundary;
