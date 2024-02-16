import { cva } from 'class-variance-authority';
import { Text as RNText } from 'react-native';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import type { TextProps } from 'react-native';

const textVariants = cva('font-sans font-normal', {
	variants: {
		variant: {
			default: 'text-foreground',
			secondary: 'text-secondary',
			successful: 'text-successful',
			destructive: 'text-destructive',
			light: 'text-background'
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

const Text = ({ variant, size, className, ...props }: Props) => (
	<RNText
		{...props}
		style={{ fontFamily: 'Inter_400Regular' }}
		className={cn(textVariants({ variant, size, className }))}
	/>
);

export default Text;
