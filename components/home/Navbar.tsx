"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Explore" },
    { href: "/cultures", label: "Cultures" },
    { href: "/vendors", label: "Vendors" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-0 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center relative z-[110]">
          <span className="text-xl md:text-2xl font-bold text-[#F2CA50] tracking-[0.1em] uppercase">
            Ophir Reserve
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300 relative group ${
                pathname === link.href ? "text-[#F2CA50]" : "text-stone-100 hover:text-[#F2CA50]"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#F2CA50]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/login" 
            className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-100 hover:text-[#F2CA50] transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/started" 
            className="px-6 py-3 bg-[#F2CA50] text-[#0D0D0D] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all duration-300 shadow-lg shadow-black/20"
          >
            Plan Event
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-[110] p-2 text-stone-100 hover:text-[#F2CA50] transition-colors"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-left ${isMenuOpen ? "rotate-[42deg]" : ""}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 translate-x-2" : ""}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-[42deg]" : ""}`} />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#0D0D0D] z-[100] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        }`}>
          <div className="flex flex-col h-full pt-32 px-8 pb-12">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-8 mb-auto">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`text-2xl uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                    pathname === link.href ? "text-[#F2CA50]" : "text-stone-400 hover:text-stone-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Bottom Actions */}
            <div className="flex flex-col gap-4">
              <Link 
                href="/login" 
                className="w-full py-4 border border-[#F2CA50]/40 text-[#F2CA50] text-center text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#F2CA50]/5 transition-all"
              >
                Sign In
              </Link>
              <Link 
                href="/started" 
                className="w-full py-4 bg-[#F2CA50] text-[#0D0D0D] text-center text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all"
              >
                Plan Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
