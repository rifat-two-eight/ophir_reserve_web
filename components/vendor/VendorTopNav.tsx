"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function VendorTopNav() {
  const [search, setSearch] = useState("");
  const [avatar, setAvatar] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadAvatar = () => {
      const saved = localStorage.getItem("vendor_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.avatar !== undefined) setAvatar(parsed.avatar);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const loadUnreadCount = () => {
      const savedCount = localStorage.getItem("vendor_unread_notifications_count");
      if (savedCount !== null) {
        setUnreadCount(parseInt(savedCount, 10));
      } else {
        setUnreadCount(2); // Default unread notifications
      }
    };

    loadAvatar();
    loadUnreadCount();

    const handleUpdate = () => {
      loadAvatar();
    };

    const handleNotificationsUpdate = () => {
      loadUnreadCount();
    };

    window.addEventListener("vendor_profile_update", handleUpdate);
    window.addEventListener("vendor_notifications_update", handleNotificationsUpdate);
    window.addEventListener("storage", () => {
      loadAvatar();
      loadUnreadCount();
    });

    return () => {
      window.removeEventListener("vendor_profile_update", handleUpdate);
      window.removeEventListener("vendor_notifications_update", handleNotificationsUpdate);
      window.removeEventListener("storage", () => {
        loadAvatar();
        loadUnreadCount();
      });
    };
  }, []);

  return (
    <header className="h-[72px] flex-shrink-0 flex items-center gap-5 px-8 bg-[#111111] border-b border-white/5">
      {/* Page Breadcrumb */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-semibold text-stone-100 font-serif tracking-wide truncate">
          Vendor Master Control
        </h1>
        <p className="text-xs text-stone-500 font-sans tracking-wide truncate">
          Managing your curated portfolio of exceptional experiences.
        </p>
      </div>

      {/* Search */}
      <div className="relative hidden sm:block">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="pl-10 pr-5 py-2.5 text-sm bg-white/5 border border-white/8 focus:border-[#F2CA50]/40 focus:ring-0 text-stone-300 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans w-56 lg:w-72"
        />
      </div>

      {/* Notification Bell Link */}
      <Link
        href="/vendor/notifications"
        className="relative h-10 w-10 flex items-center justify-center rounded-sm bg-white/5 border border-white/8 hover:bg-white/8 hover:border-[#F2CA50]/25 transition-all duration-200 cursor-pointer flex-shrink-0"
        title="Messages & Notifications"
      >
        <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#F2CA50]" />
        )}
      </Link>

      {/* Profile Icon Link */}
      <Link
        href="/vendor/profile"
        className="h-10 w-10 flex items-center justify-center rounded-sm bg-[#F2CA50]/15 border border-[#F2CA50]/30 hover:bg-[#F2CA50]/20 hover:border-[#F2CA50]/50 text-[#F2CA50] transition-all duration-200 cursor-pointer flex-shrink-0 overflow-hidden"
        title="Vendor Profile"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="Vendor Profile" className="h-full w-full object-cover" />
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </Link>

    </header>
  );
}
