import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';

const PageContainer = ({ children }: PropsWithChildren) => {
	const { top, bottom } = useSafeAreaInsets();

	return (
		<View className={cn('mx-auto w-full flex-1 bg-background', top && 'pt-5', bottom && 'pb-5')}>
			{children}
		</View>
	);
};

export default memo(PageContainer);
