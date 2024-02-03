import { Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

type Props = PressableProps & {
	children: string | JSX.Element;
	textClassNames?: string;
};

const Button = (props: Props) => {
	return <Pressable {...props} />;
};

export default Button;
