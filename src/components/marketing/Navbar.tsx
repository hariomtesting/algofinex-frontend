import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: '3-Day Session', path: '/session' },
    { label: 'Referral', path: '/referral' },
    { label: 'Support', path: '/support' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#080A0D]/95 backdrop-blur-md border-[#20252C] py-2.5 shadow-panel'
          : 'bg-[#080A0D]/80 backdrop-blur-sm border-[#20252C]/60 py-3.5'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Mark: Institutional FinTech mark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          className="flex items-center gap-2.5 group focus:outline-none rounded-md shrink-0"
        >
          {/* Logo Glyph */}
          <div className="size-8 rounded-lg bg-[#141820] border border-[#20252C] group-hover:border-[#C8A96B]/50 flex items-center justify-center transition-all duration-200 shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 18L10 11L14 15L20 7"
                stroke="#C8A96B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="7" r="2.5" fill="#C8A96B" />
              <line
                x1="4"
                y1="20"
                x2="20"
                y2="20"
                stroke="#6B7380"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-baseline">
            <span className="font-semibold tracking-tight text-[#F3F4F6] text-lg leading-none">
              Algo<span className="text-[#C8A96B] font-medium">Finex</span>
            </span>
            <span className="size-1 rounded-full bg-[#C8A96B] ml-1 opacity-80" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider uppercase">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(item.path, e)}
                className={`transition-colors duration-150 py-1 border-b ${
                  isActive
                    ? 'text-[#C8A96B] border-[#C8A96B]'
                    : 'text-[#8B929C] hover:text-[#F3F4F6] border-transparent'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onNavigate('/app')}
            className="text-xs font-mono uppercase px-3 py-1.5 rounded-lg text-[#8B929C] hover:text-[#F3F4F6] hover:bg-[#141820] border border-transparent hover:border-[#20252C] transition-all cursor-pointer"
          >
            Terminal Workstation
          </button>

          <button
            onClick={() => onNavigate('/login')}
            className="text-xs font-mono uppercase px-3.5 py-1.5 rounded-lg text-[#F3F4F6] bg-[#141820] border border-[#20252C] hover:border-[#2E3642] transition-colors cursor-pointer"
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

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('/pricing')}
          >
            Get Started
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#141820] border border-[#20252C] text-[#8B929C] hover:text-[#F3F4F6] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080A0D]/98 border-b border-[#20252C] px-5 py-5 flex flex-col gap-3 shadow-panel">
          <nav className="flex flex-col text-sm font-medium">
            {navLinks.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(item.path, e)}
                className={`py-2.5 border-b border-[#1C2128] flex items-center justify-between ${
                  currentPath === item.path ? 'text-[#C8A96B]' : 'text-[#8B929C]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#4B5563]">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/app');
              }}
              className="w-full py-2.5 rounded-lg text-xs font-mono uppercase bg-[#141820] border border-[#20252C] text-[#F3F4F6] text-center"
            >
              Launch Workstation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/login');
              }}
              className="w-full py-2.5 rounded-lg text-xs font-mono uppercase bg-transparent border border-[#20252C] text-[#8B929C] text-center"
            >
              Client Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
