import { cssInterop } from 'nativewind';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

const PressAnimated = Animated.createAnimatedComponent(Pressable);

export const AnimatedPressable = cssInterop(PressAnimated, {
	className: {
		target: 'style'
	}
});

export const AnimatedView = cssInterop(Animated.View, {
	className: {
		target: 'style'
	}
});
