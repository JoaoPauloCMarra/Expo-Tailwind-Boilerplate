import { render, screen } from '@testing-library/react-native';
import Button from './button';
import Text from './text';

it('renders the button', () => {
	render(
		<Button>
			<Text>Press me</Text>
		</Button>
	);

	expect(screen.getByText('Press me')).toBeTruthy();
});
