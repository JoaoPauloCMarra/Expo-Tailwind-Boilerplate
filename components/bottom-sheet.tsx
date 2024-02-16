import React, { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
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
import { cn } from '@/lib/utils';
import { AnimatedPressable, AnimatedView } from './animated-components';

type BottomSheetProps = PropsWithChildren & {
	visible: boolean;
	onClose: () => void;
};

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
			<AnimatedPressable
				onPress={props.onClose}
				entering={FadeIn}
				exiting={FadeOut}
				className="absolute inset-0 z-10 bg-black/60"
			/>
			<GestureDetector gesture={panGesture}>
				<AnimatedView
					entering={SlideInDown.springify().damping(15)}
					exiting={SlideOutDown}
					className={cn(
						'absolute bottom-0 z-20 w-full rounded-t-2xl bg-red-200 pt-4',
						`pb-[${insets.bottom + 16}px]`
					)}
					style={translateY}
					onLayout={(event) => {
						contentHeight.current = event.nativeEvent.layout.height;
					}}
				>
					{props.children}
				</AnimatedView>
			</GestureDetector>
		</>
	);
};

export default BottomSheet;
