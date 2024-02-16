import { memo, type PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { KeyboardAvoidingViewProps } from 'react-native';

type Props = KeyboardAvoidingViewProps & PropsWithChildren;

const KeyBoardAvoidContainer = (props: Props) => {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			{...props}
		/>
	);
};

export default memo(KeyBoardAvoidContainer);
