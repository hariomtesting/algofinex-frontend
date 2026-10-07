import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Session', path: '/session' },
    { label: 'Referral', path: '/referral' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'py-3'
          : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between gap-4 px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-200 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border border-[#EAEAE5] shadow-sm'
              : 'bg-white/80 backdrop-blur-xs border border-[#EAEAE5]/80 shadow-xs'
          }`}
        >
          {/* AlgoFinex Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="size-8 rounded-xl bg-[#F1F4FF] border border-[#E0E7FF] group-hover:scale-105 flex items-center justify-center transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 18L10 11L14 15L20 7"
                  stroke="#4F6BFF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="7" r="2.2" fill="#4F6BFF" />
              </svg>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold tracking-tight text-[#17181C] text-lg leading-none">
                Algo<span className="text-[#4F6BFF] font-semibold">Finex</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(item.path, e)}
                  className={`transition-colors duration-150 py-1 ${
                    isActive
                      ? 'text-[#4F6BFF] font-semibold'
                      : 'text-[#666B76] hover:text-[#17181C]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-xl border border-[#EAEAE5] bg-white text-[#666B76] hover:text-[#17181C] hover:bg-[#F1F4FF] transition-all cursor-pointer"
            >
              {isDark ? <Sun className="size-4 text-[#F4C95D]" /> : <Moon className="size-4 text-[#666B76]" />}
            </button>

            <button
              onClick={() => onNavigate('/app')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg text-[#666B76] hover:text-[#17181C] hover:bg-[#F1F4FF] transition-all cursor-pointer"
            >
              Workstation
            </button>

            <button
              onClick={() => onNavigate('/login')}
              className="text-xs font-medium px-3.5 py-1.5 rounded-lg text-[#17181C] hover:bg-[#F4F5F8] transition-colors cursor-pointer"
            >
              Login
            </button>

            <Button
              size="sm"
              variant="primary"
              onClick={() => onNavigate('/pricing')}
              rightIcon={<ArrowUpRight className="size-3.5" />}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="p-1.5 rounded-lg border border-[#EAEAE5] bg-white text-[#666B76] hover:text-[#17181C] cursor-pointer"
            >
              {isDark ? <Sun className="size-4 text-[#F4C95D]" /> : <Moon className="size-4" />}
            </button>

            <Button
              size="sm"
              variant="primary"
              onClick={() => onNavigate('/pricing')}
            >
              Start
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-[#EAEAE5] text-[#666B76] hover:text-[#17181C] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="max-w-[1240px] mx-auto px-4 mt-2 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 shadow-lg flex flex-col gap-3 text-left">
            <nav className="flex flex-col text-sm font-medium">
              {navLinks.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(item.path, e)}
                  className={`py-2.5 border-b border-[#F0F1EE] flex items-center justify-between ${
                    currentPath === item.path ? 'text-[#4F6BFF] font-semibold' : 'text-[#666B76]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#9CA3AF]">→</span>
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/app');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-medium bg-[#F1F4FF] text-[#4F6BFF] text-center"
              >
                Launch Workstation
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/login');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-medium bg-white border border-[#EAEAE5] text-[#17181C] text-center"
              >
                Client Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
