import { cn } from './utils';

type ApplyButtonStylesParams<V, S> = {
	componentVariants: {
		base: string;
		variants: {
			variant: Record<string, string>;
			size: Record<string, string>;
		};
	};
	variant?: V;
	size?: S;
};

export const componentPainter = <V, S>({
	componentVariants: { base, variants },
	variant = 'default' as unknown as V,
	size = 'default' as unknown as S
}: ApplyButtonStylesParams<V, S>) => {
	try {
		const variantClassName = variants.variant[variant as keyof typeof variants.variant];
		const sizeClassName = variants.size[size as keyof typeof variants.size];
		return cn(`${base} ${variantClassName} ${sizeClassName}`);
	} catch (e) {
		console.error(e);
	}
};
