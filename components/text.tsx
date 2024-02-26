import { Span, P, A, H1, H2, H3, H4 } from '@expo/html-elements';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import type { TextProps } from 'react-native';

const textVariants = cva('m-0 size-auto p-0 font-sans font-normal', {
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
			'2xl': 'text-2xl',
			'3xl': 'text-3xl'
		},
		html: {
			span: 'text-base',
			p: 'text-base',
			a: 'text-base underline',
			label: 'text-base', // TODO: replace with upcoming Label from the package
			h1: 'text-3xl',
			h2: 'text-2xl',
			h3: 'text-xl',
			h4: 'text-lg'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
		html: 'span'
	}
});

const allowedComponents = {
	span: Span,
	p: P,
	a: A,
	label: Span, // TODO: replace with upcoming Label from the package
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4
};

export type Props = TextProps &
	VariantProps<typeof textVariants> & {
		children: string | JSX.Element;
		textProps?: TextProps;
		as?: keyof typeof allowedComponents;
	};

const Text = ({ variant, size, className, as = 'span', ...props }: Props) => {
	const Component = allowedComponents[as];
	return (
		<Component
			{...props}
			style={{ fontFamily: 'Inter_400Regular' }}
			className={cn(textVariants({ variant, size, html: as, className }))}
		/>
	);
};

export default Text;
