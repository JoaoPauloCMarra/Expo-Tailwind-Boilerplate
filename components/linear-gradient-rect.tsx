import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import type { LinearGradientProps } from 'expo-linear-gradient';

const LinearGradient = cssInterop(ExpoLinearGradient, {
	className: {
		target: 'style'
	}
});

const LinearGradientRect = ({ children, ...props }: LinearGradientProps) => {
	return <LinearGradient {...props}>{children}</LinearGradient>;
};

export default LinearGradientRect;
