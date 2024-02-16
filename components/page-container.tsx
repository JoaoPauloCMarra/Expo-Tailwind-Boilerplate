import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';

const PageContainer = (props: PropsWithChildren) => {
	const { top, bottom } = useSafeAreaInsets();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
			<View className={cn('mx-auto w-full flex-1 bg-background', top && 'pt-5', bottom && 'pb-5')}>
				{props.children}
			</View>
		</SafeAreaView>
	);
};

export default memo(PageContainer);
