import { cssInterop } from 'nativewind';
import RNSvg from 'react-native-svg';
export * from 'react-native-svg';

export const Svg = cssInterop(RNSvg, {
	className: {
		target: 'style',
		nativeStyleToProp: {
			height: true,
			width: true
		}
	}
});
