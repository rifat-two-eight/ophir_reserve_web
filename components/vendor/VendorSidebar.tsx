"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  {
    id: "overview",
    label: "Overview",
    href: "/vendor",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 7a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM13 7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V7zM13 15a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM3 15a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    id: "bookings",
    label: "Bookings",
    href: "/vendor/bookings",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "messages",
    label: "Messages",
    href: "/vendor/messages",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    id: "finances",
    label: "Finances",
    href: "/vendor/finances",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "services",
    label: "Services",
    href: "/vendor/services",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

export default function VendorSidebar() {
  const pathname = usePathname();
  const [vendorName, setVendorName] = useState("Heritage Estates");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const loadVendorProfile = () => {
      const saved = localStorage.getItem("vendor_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.vendorName) setVendorName(parsed.vendorName);
          if (parsed.avatar !== undefined) setAvatar(parsed.avatar);
        } catch (e) {
          console.error(e);
        }
      }
    };

    loadVendorProfile();

    const handleUpdate = () => {
      loadVendorProfile();
    };

    window.addEventListener("vendor_profile_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("vendor_profile_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col bg-[#111111] border-r border-[#534724] h-full">
      {/* Logo */}
      <div className="px-7 pt-9 pb-7 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xl font-semibold text-[#F2CA50] font-serif leading-tight tracking-wide">Ophir Vendor</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/vendor"
              ? pathname === "/vendor"
                ? true
                : pathname === "/vendor/overview"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-sm text-xs uppercase tracking-[0.12em] font-sans font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#F2CA50]/12 text-[#F2CA50] border border-[#F2CA50]/20"
                  : "text-stone-500 hover:text-stone-300 hover:bg-white/4 border border-transparent"
              }`}
            >
              <span className={isActive ? "text-[#F2CA50]" : "text-stone-600"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-4 border-t border-white/5 pt-4">
        <button className="flex items-center gap-3.5 w-full px-4 py-3 rounded-sm text-xs uppercase tracking-[0.12em] font-sans font-semibold text-stone-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 border border-transparent cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* Vendor Profile */}
      <div className="px-5 py-5 border-t border-white/5">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-full bg-[#F2CA50]/15 border border-[#F2CA50]/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={vendorName} className="h-full w-full object-cover" />
            ) : (
              <svg className="h-4.5 w-4.5 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-stone-200 font-sans font-semibold truncate">{vendorName}</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-sans">Elite Vendor</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
