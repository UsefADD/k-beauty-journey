import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{ name?: string }>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{ name?: string }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`App crashed in ${this.props?.name ?? 'Unknown boundary'}:`, error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-lg text-center space-y-4">
            <h1 className="text-2xl font-semibold">Something went wrong{this.props?.name ? ` in ${this.props.name}` : ''}</h1>
            <p className="text-muted-foreground">{this.state.error?.message}</p>
            {this.state.errorInfo?.componentStack && (
              <details className="text-left mx-auto w-full max-w-lg bg-muted/30 p-3 rounded">
                <summary className="cursor-pointer text-sm">Show error details</summary>
                <pre className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">
{this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              className="px-4 py-2 border rounded"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
