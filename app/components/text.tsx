import type { Ref } from 'react';
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { Text as RNText } from 'react-native';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import type { TextProps } from 'react-native';

const textVariants = cva('font-sans font-normal', {
	variants: {
		variant: {
			default: 'text-primary',
			successful: 'text-successful',
			destructive: 'text-destructive',
			secondary: 'text-secondary'
		},
		size: {
			default: 'text-base',
			sm: 'text-sm',
			lg: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type Props = TextProps &
	VariantProps<typeof textVariants> & {
		children: string | JSX.Element;
		textProps?: TextProps;
	};

const Text = forwardRef(({ variant, size, className, ...props }: Props, ref: Ref<RNText>) => {
	return (
		<RNText
			style={{ fontFamily: 'Inter_400Regular' }}
			{...props}
			className={cn(textVariants({ variant, size, className }))}
			ref={ref}
		/>
	);
});
Text.displayName = 'Text';

export default Text;
