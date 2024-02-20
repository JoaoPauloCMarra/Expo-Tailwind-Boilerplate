import type { Ref } from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { defaultHitSlop } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Text from './text';
import type { TouchableOpacityProps } from 'react-native-gesture-handler';

const buttonVariants = cva(
	'z-10 flex shrink select-none items-center justify-center whitespace-nowrap rounded-md bg-transparent',
	{
		variants: {
			variant: {
				default: 'bg-primary',
				secondary: 'bg-secondary',
				successful: 'bg-successful',
				destructive: 'bg-destructive',
				outline: 'border border-primary bg-background',
				ghost: 'border-0',
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
		classNames.push('text-foreground');
	}
	if (variant === 'link') {
		classNames.push('text-foreground underline-offset-4 underline-foreground underline');
	}

	if (!size || size === 'default') {
		classNames.push('text-base');
	}

	return classNames.join(' ');
}

type Props = TouchableOpacityProps &
	VariantProps<typeof buttonVariants> & {
		children: string;
	};

const Button = forwardRef(
	({ children, variant, size, className, ...props }: Props, ref: Ref<View>) => (
		<TouchableOpacity {...props}>
			<View
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				hitSlop={defaultHitSlop}
			>
				<Text className={cn(applyTextClassNamesByVariant(variant, size))}>{String(children)}</Text>
			</View>
		</TouchableOpacity>
	)
);
Button.displayName = 'Button';

export default Button;
