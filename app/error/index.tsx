import ErrorBoundary from '@/app/components/error-boundary';

const ErrorPage = () => (
	<ErrorBoundary error={Error('Test error message')} retry={async () => {}} />
);

export default ErrorPage;
