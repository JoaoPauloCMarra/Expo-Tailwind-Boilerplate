import type { Ref } from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';
import type { PressableProps, View } from 'react-native';

const buttonVariants = cva(
	'inline-flex bg-transparent select-none border items-center justify-center whitespace-nowrap rounded-md transition-colors duration-200',
	{
		variants: {
			variant: {
				default: 'bg-primary',
				secondary: 'bg-secondary hover:bg-secondary/80',
				successful: 'bg-successful',
				destructive: 'bg-destructive',
				outline: 'border border-primary-foreground bg-background hover:border-primary',
				ghost: 'border-0 hover:bg-primary-foreground',
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
	console.log(variant, size);
	const classNames = [];
	if (!variant || variant === 'default') {
		classNames.push('text-black');
	}
	if (variant === 'secondary') {
		classNames.push('text-white');
	}
	if (variant === 'successful') {
		classNames.push('text-white');
	}
	if (variant === 'destructive') {
		classNames.push('text-white');
	}
	if (variant === 'outline') {
		classNames.push('text-white');
	}
	if (variant === 'ghost') {
		classNames.push('text-white');
	}
	if (variant === 'link') {
		classNames.push('text-white hover:underline underline-offset-4 underline-white');
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
				<Text className={applyTextClassNamesByVariant(variant, size)}>{children}</Text>
			</Pressable>
		);
	}
);
Button.displayName = 'Button';

export default Button;
