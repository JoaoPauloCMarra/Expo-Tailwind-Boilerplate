import React, { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	clamp,
	FadeIn,
	FadeOut,
	runOnJS,
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styleSheetShadows, colorPalette, backdropBgColor } from '@/lib/constants';

type BottomSheetProps = PropsWithChildren & {
	visible: boolean;
	onClose: () => void;
};

const BottomSheet = (props: BottomSheetProps) => {
	const offset = useSharedValue(0);
	const contentHeight = useRef(0);
	const insets = useSafeAreaInsets();

	const pan = Gesture.Pan()
		.runOnJS(true)
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;
			const clampOffset = clamp(offsetDelta, 0, contentHeight.current);
			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clampOffset);
		})
		.onFinalize(() => {
			if (offset.value < contentHeight.current / 3) {
				offset.value = withSpring(0);
			} else {
				offset.value = withTiming(contentHeight.current, {}, () => {
					runOnJS(props.onClose)();
				});
			}
		});

	const smoothOffset = useDerivedValue(() => {
		return withSpring(offset.value);
	});

	const translateY = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: smoothOffset.value
				}
			]
		};
	});

	useEffect(() => {
		if (!props.visible) return;
		offset.value = 0;
	}, [offset, props.visible]);

	if (!props.visible) {
		return null;
	}

	return (
		<>
			<PressAnimated
				onPress={props.onClose}
				entering={FadeIn}
				exiting={FadeOut}
				style={styles.backdrop}
			/>

			<Animated.View
				entering={SlideInDown.springify().damping(15)}
				exiting={SlideOutDown}
				style={[
					styles.content,
					translateY,
					{ paddingBottom: 20 + (insets.bottom > 0 ? insets.bottom : 20), bottom: -20 }
				]}
				onLayout={(event) => {
					contentHeight.current = event.nativeEvent.layout.height;
				}}
			>
				<GestureDetector gesture={pan}>
					<View className="absolute inset-x-0 top-0 h-8 w-full items-center justify-center">
						<View className="h-2 w-20 rounded-full bg-foreground/60" />
					</View>
				</GestureDetector>
				<View className="w-full flex-1 pt-8">{props.children}</View>
			</Animated.View>
		</>
	);
};

export default BottomSheet;

const PressAnimated = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: backdropBgColor,
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
