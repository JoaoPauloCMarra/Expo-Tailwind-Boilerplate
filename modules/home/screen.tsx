import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Button from '@/components/button';
import Input from '@/components/input';
import KeyBoardAvoidContainer from '@/components/keyboard-avoid-container';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';
import useHomePage from './useHomePage';

const HomeScreen = () => {
	const {
		sampleText,
		inputPostId,
		postsData,
		postsError,
		postsAreFetching,

		onIdInputChange,
		onApiCallPress
	} = useHomePage();

	return (
		<KeyBoardAvoidContainer>
			<PageContainer>
				<View className="mx-auto w-full flex-1 items-center justify-center px-8">
					<Text size="2xl">Onboarding</Text>
					<Text size="lg">{String(sampleText)}</Text>
					<View className="mt-2 size-32 bg-foreground" />
					<View className="w-full max-w-64 py-4">
						<Input
							keyboardType="numeric"
							returnKeyType="done"
							placeholder="Post ID"
							value={inputPostId ? String(inputPostId) : ''}
							onChangeText={onIdInputChange}
							onReturnPressed={onApiCallPress}
						/>
					</View>
					<View className="flex w-full flex-1 items-center">
						<View className="flex flex-col gap-4">
							<Button onPress={onApiCallPress}>{`API Call for ${String(inputPostId)}`}</Button>
							<Button onPress={() => router.replace('/demo-form/')} variant="secondary">
								Try the demo form
							</Button>
							<Button onPress={() => router.replace('/camera/')} variant="secondary">
								Try the Camera demo
							</Button>
							<Button onPress={() => router.replace('/image-picker/')} variant="secondary">
								Try the Image Picker demo
							</Button>
						</View>
						<ScrollView className="max-h-80 w-full flex-1">
							{postsAreFetching ? <Text>loading...</Text> : null}
							{postsError ? <Text>{JSON.stringify(postsError, null, 2)}</Text> : null}
							{postsData ? (
								<View key={postsData.id} className="my-2 rounded-lg border px-2 py-1">
									<Text>{postsData.title}</Text>
								</View>
							) : null}
						</ScrollView>
					</View>
				</View>
			</PageContainer>
		</KeyBoardAvoidContainer>
	);
};

export default HomeScreen;
