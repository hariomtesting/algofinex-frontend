/**
 * AlgoFinex — Protected Route Guard Component (React Router)
 *
 * Flow:
 * status === "loading"        -> Workspace Loading Skeleton
 * status === "unauthenticated" -> <Navigate to="/login?redirect=<original-path>" replace />
 * status === "authenticated"   -> Render children or <Outlet />
 */

import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../router/routes";
import { LoadingState } from "../ui/app";

export interface ProtectedRouteProps {
  readonly children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { status, isAuthenticated } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-bg-base)",
          color: "var(--color-text-secondary)",
        }}
      >
        <LoadingState message="Verifying session authorization..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    const originalPath = location.pathname + location.search;
    const redirectUrl = originalPath && originalPath !== ROUTES.LOGIN
      ? `${ROUTES.LOGIN}?redirect=${encodeURIComponent(originalPath)}`
      : ROUTES.LOGIN;

    return <Navigate to={redirectUrl} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
