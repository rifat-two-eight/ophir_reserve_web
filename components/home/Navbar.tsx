"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1440px] mx-auto h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#F2CA50] tracking-[0.1em] uppercase">
            Ophir Reserve
          </span>
        </Link>

        {/* Center Nav Items */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            href="/explore" 
            className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300 relative group ${
              pathname === "/explore" ? "text-[#F2CA50]" : "text-stone-100 hover:text-[#F2CA50]"
            }`}
          >
            Explore
            <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#F2CA50] scale-x-100 transition-transform duration-300" />
          </Link>
          <Link 
            href="/cultures" 
            className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:text-[#F2CA50] ${
              pathname === "/cultures" ? "text-[#F2CA50]" : "text-stone-100"
            }`}
          >
            Cultures
          </Link>
          <Link 
            href="/vendors" 
            className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:text-[#F2CA50] ${
              pathname === "/vendors" ? "text-[#F2CA50]" : "text-stone-100"
            }`}
          >
            Vendors
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
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
      </div>
    </nav>
  );
}
