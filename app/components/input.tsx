import type { Ref } from 'react';
import { forwardRef, useState } from 'react';
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

const Input = forwardRef((props: TextInputProps, ref: Ref<TextInput>) => {
	const { className, defaultValue, keyboardType } = props;
	const { value, onChangeText } = useInput({ defaultValue, keyboardType });

	return (
		<TextInput
			{...props}
			ref={ref}
			className={cn(
				'h-8 rounded-lg border border-primary px-2 py-0 text-primary outline-none',
				className
			)}
			value={value}
			onChangeText={onChangeText}
		/>
	);
});
Input.displayName = 'Input';

export default Input;
