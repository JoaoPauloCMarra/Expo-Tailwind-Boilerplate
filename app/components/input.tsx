import { useState } from 'react';
import { TextInput } from 'react-native';
import { cn } from '../lib/utils';
import type { TextInputProps } from 'react-native';

type UseInputProps = {
	keyboardType?: TextInputProps['keyboardType'];
	defaultValue?: string;
};

const useInput = ({ defaultValue = '', keyboardType = 'default' }: UseInputProps) => {
	const [value, setValue] = useState(defaultValue);

	const onChangeText: (text: string) => void = (text) => {
		if (
			['numeric', 'number-pad', 'numbers-and-punctuation', 'phone-pad', 'decimal-pad'].includes(
				keyboardType
			)
		) {
			if (isNaN(Number(text.replace(/,/g, '')))) return;
		}

		setValue(text);
	};

	return { value, onChangeText };
};

const Input = (props: TextInputProps) => {
	const { className, defaultValue, keyboardType } = props;
	const { value, onChangeText } = useInput({ defaultValue, keyboardType });

	return (
		<TextInput
			{...props}
			className={cn('mt-2 h-8 w-full rounded-lg border border-primary px-2 py-1', className)}
			value={value}
			onChangeText={onChangeText}
		/>
	);
};

export default Input;
