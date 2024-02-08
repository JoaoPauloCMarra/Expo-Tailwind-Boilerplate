import type { KeyboardEvent, Ref } from 'react';
import { forwardRef, useState } from 'react';
import { TextInput } from 'react-native';
import { isWeb } from '@/lib/constants';
import { cn } from '../lib/utils';
import type {
	NativeSyntheticEvent,
	TextInputEndEditingEventData,
	TextInputKeyPressEventData,
	TextInputProps
} from 'react-native';

type UseInputProps = {
	keyboardType?: TextInputProps['keyboardType'];
	defaultValue?: string;
};

type TextInputKeyPressEvent = NativeSyntheticEvent<TextInputKeyPressEventData> &
	KeyboardEvent<HTMLInputElement>;
type TextInputEndEditingEvent = NativeSyntheticEvent<TextInputEndEditingEventData>;

const useInput = ({ defaultValue = '', keyboardType = 'default' }: UseInputProps) => {
	const [value, setValue] = useState(defaultValue);

	const onChange = (value: string): string => {
		if (
			['numeric', 'number-pad', 'numbers-and-punctuation', 'phone-pad', 'decimal-pad'].includes(
				keyboardType
			)
		) {
			if (isNaN(Number(value.replace(/,/g, '')))) return '';
		}

		setValue(value);
		return value || '';
	};

	return { value, onChange };
};

type Props = TextInputProps & {
	onReturnPressed?: (value: string) => void;
};

const Input = forwardRef((props: Props, ref: Ref<TextInput>) => {
	const { className, defaultValue, keyboardType, onReturnPressed } = props;
	const { value, onChange } = useInput({ defaultValue, keyboardType });

	const onKeyPress = (e: TextInputKeyPressEvent) => {
		if (isWeb && e.key === 'Enter' && onReturnPressed) {
			e.preventDefault();
			onReturnPressed(value);
		}
	};

	const onEndEditing = (e: TextInputEndEditingEvent) => {
		if (!isWeb && onReturnPressed) {
			e.preventDefault();
			onReturnPressed(value);
		}
	};

	const onChangeText = (nextValue: string) => {
		props.onChangeText?.(onChange(nextValue));
	};

	return (
		<TextInput
			{...props}
			ref={ref}
			className={cn(
				'h-8 rounded-lg border border-input bg-background px-2 py-0 text-foreground outline-none placeholder:text-slate-400',
				className
			)}
			value={value}
			onChangeText={onChangeText}
			onKeyPress={(e) => onKeyPress(e as TextInputKeyPressEvent)}
			onEndEditing={(e) => onEndEditing(e as TextInputEndEditingEvent)}
		/>
	);
});
Input.displayName = 'Input';

export default Input;
