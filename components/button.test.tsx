import { render, screen } from '@testing-library/react-native';
import Button from './button';

it('renders the button', () => {
	render(<Button>Press me</Button>);

	expect(screen.getByText('Press me')).toBeTruthy();
});
