"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  {
    id: "overview",
    label: "Overview",
    href: "/admin",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 7a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM13 7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V7zM13 15a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM3 15a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    id: "users",
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "vendors",
    label: "Vendors",
    href: "/admin/vendors",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: "transactions",
    label: "Transactions",
    href: "/admin/transactions",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [fullName, setFullName] = useState("John Doe");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem("admin_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.avatar !== undefined) setAvatar(parsed.avatar);
        } catch (e) {
          console.error(e);
        }
      }
    };

    loadProfile();

    const handleUpdate = () => {
      loadProfile();
    };

    window.addEventListener("admin_profile_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("admin_profile_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col bg-[#111111] border-r border-[#534724] h-full">
      {/* Logo */}
      <div className="px-7 pt-9 pb-7 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xl font-semibold text-[#F2CA50] font-serif leading-tight tracking-wide">Ophir Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-sm text-xs uppercase tracking-[0.12em] font-sans font-semibold transition-all duration-200 ${isActive
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

      {/* Admin Profile */}
      <div className="px-5 py-5 border-t border-white/5">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-full bg-[#F2CA50]/15 border border-[#F2CA50]/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={fullName} className="h-full w-full object-cover" />
            ) : (
              <svg className="h-4.5 w-4.5 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-stone-200 font-sans font-semibold truncate">{fullName}</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-sans">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
