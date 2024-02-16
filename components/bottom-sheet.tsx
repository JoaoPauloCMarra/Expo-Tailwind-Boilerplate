import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
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

type BottomSheetProps = PropsWithChildren & {
	visible: boolean;
	onClose: () => void;
};

const PressAnimated = Animated.createAnimatedComponent(Pressable);
const HEIGHT = Dimensions.get('window').height * 0.3;
const CLAMP = 20;

const BottomSheet = (props: BottomSheetProps) => {
	const offset = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;
			const clamp = Math.max(-CLAMP, offsetDelta);
			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
		})
		.onFinalize(() => {
			if (offset.value < HEIGHT / 3) {
				offset.value = withSpring(0);
			} else {
				offset.value = withTiming(HEIGHT, {}, () => {
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
					style={[styles.view, translateY]}
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
		height: HEIGHT,
		width: '100%',
		position: 'absolute',
		bottom: -CLAMP * 1.1,
		zIndex: 1,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	}
});

export default BottomSheet;
