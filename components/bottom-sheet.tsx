import React, { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	FadeIn,
	FadeOut,
	runOnJS,
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styleSheetShadows, colorPalette, defaultHitSlop } from '@/lib/constants';

type BottomSheetProps = PropsWithChildren & {
	visible: boolean;
	onClose: () => void;
};

const OVERDRAG = 20;

const BottomSheet = (props: BottomSheetProps) => {
	const offset = useSharedValue(0);
	const contentHeight = useRef(0);
	const insets = useSafeAreaInsets();

	const toggleSheet = () => {
		props.onClose();
		offset.value = 0;
	};

	const pan = Gesture.Pan()
		.runOnJS(true)
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;

			const clamp = Math.max(-OVERDRAG, offsetDelta);
			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
		})
		.onFinalize(() => {
			if (offset.value < contentHeight.current / 3) {
				offset.value = withSpring(0);
			} else {
				offset.value = withTiming(contentHeight.current, {}, () => {
					runOnJS(toggleSheet)();
				});
			}
		});

	const translateY = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }]
	}));

	if (!props.visible) {
		return null;
	}

	return (
		<>
			<Animated.View
				entering={FadeIn}
				exiting={FadeOut}
				style={styles.backdrop}
				hitSlop={defaultHitSlop}
			>
				<Pressable
					onPress={toggleSheet}
					className="absolute inset-0 size-full flex-1 bg-foreground/60"
				/>
			</Animated.View>

			<Animated.View
				entering={SlideInDown.springify().damping(15)}
				exiting={SlideOutDown}
				style={[
					styles.content,
					translateY,
					{
						paddingBottom: OVERDRAG + (insets.bottom > 0 ? insets.bottom : OVERDRAG),
						bottom: -OVERDRAG
					}
				]}
				onLayout={(event) => {
					contentHeight.current = event.nativeEvent.layout.height;
				}}
			>
				<View className="absolute inset-x-0 top-0 h-8 w-full items-center justify-center">
					<GestureDetector gesture={pan}>
						<View className="p-4">
							<View className="h-2 w-20 rounded-full bg-foreground/60" />
						</View>
					</GestureDetector>
				</View>
				<View className="w-full flex-1 pt-8">{props.children}</View>
			</Animated.View>
		</>
	);
};

export default BottomSheet;

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		zIndex: 10
	},
	content: {
		backgroundColor: colorPalette.background,
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 20,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 16,

		...styleSheetShadows.large
	}
});
