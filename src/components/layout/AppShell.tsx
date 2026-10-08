import React, { useState, ReactNode } from "react";
import { Link, useRouter } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { useAuth } from "../../context/AuthContext";
import { BRAND_CONFIG } from "../../data/mockData";

export interface AppShellProps {
  children: ReactNode;
  pageTitle?: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children, pageTitle = "Workspace" }) => {
  const { user, logout } = useAuth();
  const { currentPath, navigate } = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile drawer on Escape key for accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileSidebarOpen]);

  const navItems: readonly NavItem[] = [
    {
      label: "Overview",
      path: ROUTES.DASHBOARD,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      label: "Indicator",
      path: ROUTES.DASHBOARD_INDICATOR,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "3-Day Session",
      path: ROUTES.DASHBOARD_SESSION,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Referrals",
      path: ROUTES.DASHBOARD_REFERRALS,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      ),
    },
    {
      label: "Support",
      path: ROUTES.DASHBOARD_SUPPORT,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="app-shell-root">
      {/* 1. Desktop Persistent Sidebar */}
      <aside className={`app-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`} aria-label="Sidebar Navigation">
        <div className="app-sidebar-header">
          <Link to={ROUTES.HOME} className="app-sidebar-brand" onClick={() => setMobileSidebarOpen(false)}>
            <div className="brand-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="m7 15 4-5 4 3 6-8" />
              </svg>
            </div>
            <span className="brand-name">{BRAND_CONFIG.name}</span>
          </Link>
          <span className="app-badge app-badge-neutral app-badge-sm">APP</span>
        </div>

        <nav className="app-sidebar-nav" aria-label="Main App Navigation">
          <div className="app-nav-group-title">WORKSPACE</div>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`app-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <span className="app-nav-icon" aria-hidden="true">{item.icon}</span>
                <span className="app-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="app-sidebar-footer">
          <div className="app-nav-group-title">SETTINGS</div>
          <Link
            to={ROUTES.ACCOUNT}
            className={`app-nav-item ${currentPath === ROUTES.ACCOUNT ? "active" : ""}`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className="app-nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="app-nav-label">Account</span>
          </Link>

          <Link
            to={ROUTES.HOME}
            className="app-nav-item app-nav-external"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className="app-nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
            <span className="app-nav-label">Public Website</span>
          </Link>

          <button type="button" className="app-nav-item app-nav-logout" onClick={handleLogout}>
            <span className="app-nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className="app-nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          className="app-sidebar-backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 2. Main Content Area & Topbar */}
      <div className="app-main-layout">
        <header className="app-topbar" aria-label="Application Topbar">
          <div className="app-topbar-left">
            <button
              type="button"
              className="app-topbar-toggle"
              aria-label="Toggle Navigation Sidebar"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="app-topbar-breadcrumb">
              <span className="app-breadcrumb-root">AlgoFinex</span>
              <span className="app-breadcrumb-sep">/</span>
              <h1 className="app-breadcrumb-current">{pageTitle}</h1>
            </div>
          </div>

          <div className="app-topbar-right">
            <div className="app-user-pill">
              <div className="app-user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="app-user-info">
                <span className="app-user-name">{user?.name || "Guest Trader"}</span>
                <span className="app-user-meta">{user?.email || "Signed In"}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="app-content-body" id="app-main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
