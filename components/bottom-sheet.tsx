import React, { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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

type BottomSheetProps = PropsWithChildren & {
	visible: boolean;
	onClose: () => void;
};

const PressAnimated = Animated.createAnimatedComponent(Pressable);
const CLAMP = 20;

const BottomSheet = (props: BottomSheetProps) => {
	const offset = useSharedValue(0);
	const contentHeight = useRef(0);
	const insets = useSafeAreaInsets();

	const panGesture = Gesture.Pan()
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;
			const clamp = Math.max(-CLAMP, offsetDelta);
			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
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

	const translateY = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: offset.value
				}
			]
		};
	}, []);

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
			<GestureDetector gesture={panGesture}>
				<Animated.View
					entering={SlideInDown.springify().damping(15)}
					exiting={SlideOutDown}
					style={[styles.view, translateY, { paddingBottom: insets.bottom }]}
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

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.6)',
		zIndex: 1
	},
	view: {
		backgroundColor: 'white',
		width: '100%',
		position: 'absolute',
		bottom: -CLAMP * 1.1,
		zIndex: 1,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingTop: 16
	}
});

export default BottomSheet;
