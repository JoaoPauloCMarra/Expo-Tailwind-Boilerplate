import { ScrollView, View } from 'react-native';
import Button from '@/components/button';
import Input from '@/components/input';
import KeyBoardAvoidContainer from '@/components/keyboard-avoid-container';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';
import useHomePage from '@/hooks/useHomePage';

const HomeScreen = () => {
	const { inputPostId, postsData, postsError, postsAreFetching, onIdInputChange, onApiCallPress } =
		useHomePage();

	return (
		<KeyBoardAvoidContainer>
			<PageContainer>
				<View className="mx-auto w-full flex-1 items-center justify-center px-8">
					<Text size="2xl">Onboarding</Text>
					<View className="mt-2 size-32 bg-foreground" />
					<View className="w-full max-w-64 py-4">
						<Input
							keyboardType="numeric"
							returnKeyType="done"
							placeholder="Post ID"
							value={inputPostId ? String(inputPostId) : ''}
							onChange={onIdInputChange}
							onReturnPressed={console.log}
						/>
					</View>
					<View className="flex w-full items-center">
						<View>
							<Button onPress={onApiCallPress}>API Call</Button>
						</View>
						<ScrollView className="max-h-80 flex-1">
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
