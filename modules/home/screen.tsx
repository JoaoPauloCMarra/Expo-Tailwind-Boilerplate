import { isDevice } from 'expo-device';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Button from '@/components/button';
import ThunderIcon from '@/components/icons/thunder-icon';
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
		post,
		postsError,
		postsAreFetching,

		onSwitchLocale,
		onIdInputChange,
		onApiCallPress
	} = useHomePage();

	return (
		<PageContainer>
			<KeyBoardAvoidContainer contentContainerClassName="bg-background">
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
					<View className="mt-2 flex size-32 items-center justify-center gap-4 rounded-lg bg-slate-400">
						<Text className="text-xs text-slate-800">svg rendered</Text>
						<ThunderIcon className="ios:shadow-md android:shadow-md size-12 fill-amber-400 stroke-amber-500 web:drop-shadow-md" />
					</View>
					<ScrollView
						className="my-2 min-h-20 w-full max-w-64 flex-1"
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						bounces={false}
					>
						<View className="flex w-full max-w-64 gap-4 py-8">
							<Input
								keyboardType="numeric"
								returnKeyType="done"
								placeholder="Post ID"
								value={inputPostId ? String(inputPostId) : ''}
								onChangeText={onIdInputChange}
								onReturnPressed={onApiCallPress}
							/>
							<Button
								className="w-full"
								onPress={onApiCallPress}
							>{`API Call for ${String(inputPostId)}`}</Button>
							{postsAreFetching ? <Text>loading...</Text> : null}
							{!postsAreFetching && postsError ? (
								<Text>{JSON.stringify(postsError, null, 2)}</Text>
							) : null}
							{!postsAreFetching && post.id ? (
								<View key={post.id} className="my-2 rounded-lg border px-2 py-1">
									<Text>{post.title}</Text>
								</View>
							) : null}
						</View>
						<View className="flex w-full flex-1 items-center">
							<View className="flex w-full max-w-64 flex-col gap-4">
								<Button
									className="w-full"
									onPress={() => router.replace('/404/')}
									variant="destructive"
								>
									Try the 404 page
								</Button>
								<Button
									className="w-full"
									onPress={() => router.replace('/error/')}
									variant="destructive"
								>
									Try the error page
								</Button>
								<Button
									className="w-full"
									onPress={() => router.replace('/form/')}
									variant="secondary"
								>
									Try the demo form
								</Button>
								<Button
									className="w-full"
									onPress={() => router.replace('/camera/')}
									variant="successful"
								>
									Try the Camera demo
								</Button>
								<Button
									className="w-full"
									onPress={() => router.replace('/image-picker/')}
									variant="successful"
								>
									Try the Image Picker demo
								</Button>
								<Button
									className="w-full"
									onPress={() => router.replace('/tabs/')}
									variant="outline"
								>
									Try the Tabs demo
								</Button>
								<Button
									className="w-full"
									onPress={() => router.replace('/bottom-sheet/')}
									variant="outline"
								>
									Try the Bottom Sheet demo
								</Button>
								<Button className="w-full" onPress={() => router.replace('/slider/')}>
									Try the Slider demo
								</Button>
							</View>
						</View>
					</ScrollView>
				</View>
			</KeyBoardAvoidContainer>
		</PageContainer>
	);
};

export default HomeScreen;
