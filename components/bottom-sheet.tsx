import React, { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
import { StyleSheetShadows } from '@/lib/constants';

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
			<GestureDetector gesture={pan}>
				<Animated.View
					entering={SlideInDown.springify().damping(15)}
					exiting={SlideOutDown}
					style={[styles.content, translateY, { paddingBottom: insets.bottom - 16, bottom: -20 }]}
					onLayout={(event) => {
						contentHeight.current = event.nativeEvent.layout.height;
					}}
				>
					{props.children}
				</Animated.View>
			</GestureDetector>
		</>
	);
};

export default BottomSheet;

const PressAnimated = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.6)',
		zIndex: 1
	},
	content: {
		backgroundColor: 'white',
		width: '100%',
		position: 'absolute',
		zIndex: 2,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 16,

		...StyleSheetShadows.large
	}
});
