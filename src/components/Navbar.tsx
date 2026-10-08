import React, { useState, useEffect } from "react";
import { BRAND_CONFIG, NAVIGATION_ITEMS } from "../data/mockData";

export interface NavbarProps {
  readonly onOpenLogin: () => void;
  readonly onOpenIndicator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onOpenIndicator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="site-header"
      id="site-header"
      style={{
        borderBottomColor: isScrolled ? "var(--border-medium)" : "var(--border-subtle)",
        backgroundColor: isScrolled ? "rgba(7, 8, 10, 0.94)" : "rgba(7, 8, 10, 0.85)",
      }}
    >
      <div className="container nav-container">
        {/* Left: Brand Wordmark */}
        <a href="#" className="brand" aria-label="AlgoFinex Homepage" onClick={closeMobileMenu}>
          <div className="brand-glyph" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="m7 15 4-5 4 3 6-8" />
            </svg>
          </div>
          <span className="brand-name">{BRAND_CONFIG.name}</span>
        </a>

        {/* Center: Clean Navigation Links */}
        <nav className="nav-links" aria-label="Main navigation">
          {NAVIGATION_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            id="btn-login"
            aria-haspopup="dialog"
            onClick={onOpenLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            id="btn-nav-cta"
            onClick={onOpenIndicator}
          >
            <span>Explore Indicator</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="nav-mobile-toggle"
          id="btn-mobile-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}
        id="mobile-nav-drawer"
        hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-links">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="mobile-nav-actions">
          <button
            type="button"
            className="btn btn-primary"
            id="btn-mobile-cta"
            onClick={() => {
              closeMobileMenu();
              onOpenIndicator();
            }}
          >
            <span>Explore Indicator</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            id="btn-mobile-login"
            onClick={() => {
              closeMobileMenu();
              onOpenLogin();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};
