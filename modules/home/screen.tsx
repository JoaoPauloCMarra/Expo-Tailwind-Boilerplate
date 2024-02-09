import { isDevice } from 'expo-device';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Button from '@/components/button';
import Input from '@/components/input';
import KeyBoardAvoidContainer from '@/components/keyboard-avoid-container';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';
import useTranslations from '@/hooks/use-translations';
import useHomePage from './useHomePage';

const HomeScreen = () => {
	const { locale, t } = useTranslations();
	const {
		sampleText,
		inputPostId,
		postsData,
		postsError,
		postsAreFetching,

		onSwitchLocale,
		onIdInputChange,
		onApiCallPress
	} = useHomePage();

	return (
		<KeyBoardAvoidContainer>
			<PageContainer>
				<View className="mx-auto w-full flex-1 items-center justify-center px-8">
					<Text size="2xl">Onboarding</Text>
					<View>
						<Text size="lg">{t('General.appName')}</Text>
						<View className="flex-row justify-center gap-4">
							<Button
								variant={locale === 'en' ? 'default' : 'secondary'}
								onPress={() => onSwitchLocale('en')}
							>
								EN
							</Button>
							<Button
								variant={locale === 'pt' ? 'default' : 'secondary'}
								onPress={() => onSwitchLocale('pt')}
							>
								PT
							</Button>
						</View>
					</View>
					<Text size="lg">{`Is this a real device? ${isDevice ? 'yes' : 'no'}`}</Text>
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
							<Button onPress={() => router.replace('/404/')} variant="destructive">
								Try the 404 page
							</Button>
							<Button onPress={() => router.replace('/error/')} variant="destructive">
								Try the error page
							</Button>
							<Button onPress={() => router.replace('/form/')} variant="secondary">
								Try the demo form
							</Button>
							<Button onPress={() => router.replace('/camera/')} variant="successful">
								Try the Camera demo
							</Button>
							<Button onPress={() => router.replace('/image-picker/')} variant="successful">
								Try the Image Picker demo
							</Button>
							<Button onPress={() => router.replace('/sheet-and-tabs/')} variant="outline">
								Try the Sheet and Tabs demo
							</Button>
						</View>
						<ScrollView className="max-h-80 w-full flex-1">
							{postsAreFetching ? <Text>loading...</Text> : null}
							{postsError ? <Text>{JSON.stringify(postsError, null, 2)}</Text> : null}
							{postsData.id ? (
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
