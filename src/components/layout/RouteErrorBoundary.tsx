import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "../ui/app";

interface Props {
  readonly children: ReactNode;
  readonly fallbackTitle?: string;
}

interface State {
  readonly hasError: boolean;
  readonly error: Error | null;
}

export class RouteErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled Route Error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="app-page-container" style={{ paddingTop: "var(--space-12)", maxWidth: "600px", margin: "0 auto" }}>
          <Card variant="elevated">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag font-mono">RENDER RECOVERY</span>
              </div>
              <CardTitle>{this.props.fallbackTitle || "Something went wrong"}</CardTitle>
              <CardDescription>
                An unexpected interface error occurred. The application state has been isolated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {this.state.error && (
                <div className="app-alert app-alert-error" style={{ marginBottom: "var(--space-6)" }}>
                  {this.state.error.message}
                </div>
              )}
              <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                <Button variant="primary" size="md" onClick={this.handleReset}>
                  Reload Interface
                </Button>
                <Link to={ROUTES.HOME}>
                  <Button variant="secondary" size="md">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
