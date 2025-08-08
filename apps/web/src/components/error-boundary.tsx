import React, { ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
	children?: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ error, errorInfo });
		
		// Log error to monitoring service in production
		if (process.env.NODE_ENV === "production") {
			console.error("Error caught by boundary:", error, errorInfo);
			// Here you would typically send to a service like Sentry
			// Sentry.captureException(error, { contexts: { errorInfo } });
		} else {
			console.error("Error caught by boundary:", error, errorInfo);
		}

		// Call optional error handler
		this.props.onError?.(error, errorInfo);
	}

	private handleReset = () => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
	};

	private handleReload = () => {
		window.location.reload();
	};

	private goHome = () => {
		window.location.href = "/";
	};

	public render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
					<Card className="max-w-md w-full">
						<CardHeader className="text-center">
							<div className="flex justify-center mb-4">
								<AlertCircle className="w-12 h-12 text-red-500" />
							</div>
							<CardTitle className="text-xl">Something went wrong</CardTitle>
							<CardDescription>
								An unexpected error occurred. This has been logged and we'll look into it.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{process.env.NODE_ENV === "development" && this.state.error && (
								<details className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
									<summary className="cursor-pointer font-medium mb-2">
										Error Details
									</summary>
									<div className="space-y-2">
										<div>
											<strong>Error:</strong> {this.state.error.message}
										</div>
										<div>
											<strong>Stack:</strong>
											<pre className="text-xs overflow-auto mt-1">
												{this.state.error.stack}
											</pre>
										</div>
										{this.state.errorInfo && (
											<div>
												<strong>Component Stack:</strong>
												<pre className="text-xs overflow-auto mt-1">
													{this.state.errorInfo.componentStack}
												</pre>
											</div>
										)}
									</div>
								</details>
							)}
							
							<div className="flex flex-col sm:flex-row gap-2">
								<Button
									onClick={this.handleReset}
									className="flex-1"
									variant="outline"
								>
									<RefreshCw className="w-4 h-4 mr-2" />
									Try Again
								</Button>
								<Button
									onClick={this.handleReload}
									className="flex-1"
									variant="outline"
								>
									Reload Page
								</Button>
								<Button
									onClick={this.goHome}
									className="flex-1"
								>
									<Home className="w-4 h-4 mr-2" />
									Go Home
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			);
		}

		return this.props.children;
	}
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
	Component: React.ComponentType<P>,
	errorBoundaryProps?: Omit<Props, "children">
) {
	const WrappedComponent = (props: P) => (
		<ErrorBoundary {...errorBoundaryProps}>
			<Component {...props} />
		</ErrorBoundary>
	);
	
	WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
	
	return WrappedComponent;
}

// Hook for error boundary in functional components
export function useErrorHandler() {
	const [error, setError] = React.useState<Error | null>(null);

	const resetError = React.useCallback(() => {
		setError(null);
	}, []);

	const captureError = React.useCallback((error: Error) => {
		setError(error);
	}, []);

	React.useEffect(() => {
		if (error) {
			throw error;
		}
	}, [error]);

	return {
		captureError,
		resetError,
		hasError: !!error,
	};
}