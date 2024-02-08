import ErrorBoundary from '@/components/error-boundary';

const ErrorPage = () => <ErrorBoundary error={Error('Test error message')} />;

export default ErrorPage;
