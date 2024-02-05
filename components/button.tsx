import type { Ref } from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import Text from './text';
import type { View, PressableProps } from 'react-native';

const buttonVariants = cva(
	'flex shrink select-none items-center justify-center whitespace-nowrap rounded-md bg-transparent transition-colors duration-150',
	{
		variants: {
			variant: {
				default: 'bg-primary hover:bg-primary/80',
				secondary: 'bg-secondary hover:bg-secondary/80',
				successful: 'bg-successful hover:bg-successful/80',
				destructive: 'bg-destructive hover:bg-destructive/80',
				outline: 'border border-primary bg-background',
				ghost: 'border-0 hover:bg-primary/80',
				link: 'border-0'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

function applyTextClassNamesByVariant(
	variant: VariantProps<typeof buttonVariants>['variant'],
	size: VariantProps<typeof buttonVariants>['size']
) {
	const classNames = [];
	if (!variant || variant === 'default') {
		classNames.push('text-background');
	}
	if (variant === 'secondary') {
		classNames.push('text-background');
	}
	if (variant === 'successful') {
		classNames.push('text-background');
	}
	if (variant === 'destructive') {
		classNames.push('text-background');
	}
	if (variant === 'outline') {
		classNames.push('text-primary');
	}
	if (variant === 'ghost') {
		classNames.push('text-foreground hover:text-background');
	}
	if (variant === 'link') {
		classNames.push('text-foreground underline-offset-4 underline-foreground hover:underline');
	}

	if (!size || size === 'default') {
		classNames.push('text-base');
	}

	return classNames.join(' ');
}

type Props = PressableProps &
	VariantProps<typeof buttonVariants> & {
		children: string | JSX.Element;
	};

const Button = forwardRef(
	({ children, variant, size, className, ...props }: Props, ref: Ref<View>) => {
		return (
			<Pressable {...props} className={cn(buttonVariants({ variant, size, className }))} ref={ref}>
				<Text className={cn(applyTextClassNamesByVariant(variant, size))}>{children}</Text>
			</Pressable>
		);
	}
);
Button.displayName = 'Button';

export default Button;
