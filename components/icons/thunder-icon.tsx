import { memo } from 'react';
import { Path, Svg } from '../SvgRenderer';
import type { SvgProps } from '../SvgRenderer';

const ThunderIcon = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" {...props}>
		<Path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
	</Svg>
);

export default memo(ThunderIcon);
