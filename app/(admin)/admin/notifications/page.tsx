"use client";

import { useState, useEffect } from "react";

interface NotificationItem {
  id: string;
  category: "security" | "transaction" | "system" | "vendor";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  severity: "critical" | "warning" | "info" | "success";
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    category: "security",
    title: "Administrative Master Authorization",
    description: "New master vault keys successfully generated and logged under Secure Location Registry. IP address logged: 185.22.4.92 (London, UK).",
    timestamp: "3 minutes ago",
    read: false,
    severity: "critical",
  },
  {
    id: "notif-2",
    category: "transaction",
    title: "High-Value Custody Asset Deposit Settlement",
    description: "Ledger transaction committed: Private deposit of curated assets totaling $2,450,000 completed by Julian Thorne.",
    timestamp: "42 minutes ago",
    read: false,
    severity: "success",
  },
  {
    id: "notif-3",
    category: "vendor",
    title: "New Elite Vendor Application Pending Review",
    description: "Vendor 'Maison Heritage Curators' has submitted full authenticity certifications and is waiting in the validation queue.",
    timestamp: "2 hours ago",
    read: false,
    severity: "warning",
  },
  {
    id: "notif-4",
    category: "system",
    title: "Cloud Master System Core Synchronized",
    description: "Scheduled database backup and security protocols migration completed successfully to central vault servers.",
    timestamp: "1 day ago",
    read: true,
    severity: "info",
  },
  {
    id: "notif-5",
    category: "security",
    title: "Security Credentials Configuration Upgrade",
    description: "Master login password successfully updated from the profile control dashboard panel.",
    timestamp: "2 days ago",
    read: true,
    severity: "success",
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "security" | "transaction" | "system" | "vendor">("all");
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage or initialize defaults
  useEffect(() => {
    const saved = localStorage.getItem("admin_notifications");
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notifications", e);
        setNotifications(defaultNotifications);
        localStorage.setItem("admin_notifications", JSON.stringify(defaultNotifications));
      }
    } else {
      setNotifications(defaultNotifications);
      localStorage.setItem("admin_notifications", JSON.stringify(defaultNotifications));
    }
  }, []);

  // Recalculate and sync unread count whenever notifications state changes
  useEffect(() => {
    if (notifications.length === 0) return;
    const unread = notifications.filter((n) => !n.read).length;
    localStorage.setItem("unread_notifications_count", String(unread));
    window.dispatchEvent(new Event("admin_notifications_update"));
  }, [notifications]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem("admin_notifications", JSON.stringify(updated));
    showToast("Alert marked as processed.");
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("admin_notifications", JSON.stringify(updated));
    localStorage.setItem("unread_notifications_count", "0");
    window.dispatchEvent(new Event("admin_notifications_update"));
    showToast("All security alerts marked as read.");
  };

  const handleDismiss = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("admin_notifications", JSON.stringify(updated));
    showToast("Alert cleared from registry.");
  };

  const handleClearHistory = () => {
    setNotifications([]);
    localStorage.setItem("admin_notifications", JSON.stringify([]));
    localStorage.setItem("unread_notifications_count", "0");
    window.dispatchEvent(new Event("admin_notifications_update"));
    showToast("Registry notifications history cleared.");
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.category === activeFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return (
          <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "transaction":
        return (
          <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "vendor":
        return (
          <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case "system":
      default:
        return (
          <svg className="h-5 w-5 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
    }
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500/20 bg-red-500/10 text-red-300";
      case "warning":
        return "border-amber-500/20 bg-amber-500/10 text-amber-300";
      case "success":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
      case "info":
      default:
        return "border-blue-500/20 bg-blue-500/10 text-blue-300";
    }
  };

  return (
    <div className="space-y-7 w-full max-w-7xl mx-auto pb-10">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border border-[#F2CA50]/30 bg-[#161616] text-[#F2CA50] rounded-sm shadow-2xl transition-all duration-300 font-sans">
          <svg className="h-5 w-5 text-[#F2CA50] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs uppercase tracking-wider font-semibold">{toast}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#F2CA50] font-serif tracking-wide">Platform Alerts</h2>
          <p className="text-xs text-stone-500 font-sans mt-1 tracking-wide">
            Real-time security auditing logs, financial transaction receipts, and system performance updates.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] border border-white/8 hover:border-[#F2CA50]/30 text-stone-400 hover:text-stone-200 bg-white/2 rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Mark All as Read
            </button>
            <button
              onClick={handleClearHistory}
              className="px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] border border-red-500/20 hover:border-red-500/45 text-stone-400 hover:text-red-400 bg-red-500/5 rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Clear Logs
            </button>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 border-b border-white/5 no-scrollbar">
        {([
          { id: "all", label: "All Alerts" },
          { id: "unread", label: "Unread" },
          { id: "security", label: "Security" },
          { id: "transaction", label: "Transactions" },
          { id: "vendor", label: "Vendors" },
          { id: "system", label: "System" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-all duration-200 border-b-2 whitespace-nowrap cursor-pointer ${
              activeFilter === tab.id
                ? "border-[#F2CA50] text-[#F2CA50]"
                : "border-transparent text-stone-500 hover:text-stone-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-[#161616] border border-white/6 rounded-sm p-6 flex items-start gap-4 transition-all duration-200 hover:border-white/12 relative ${
                !notif.read ? "border-l-2 border-l-[#F2CA50] bg-white/[0.015]" : ""
              }`}
            >
              {/* Category Icon Wrapper */}
              <div className="h-10 w-10 flex items-center justify-center rounded-sm bg-white/5 border border-white/8 flex-shrink-0">
                {getCategoryIcon(notif.category)}
              </div>

              {/* Message Details */}
              <div className="flex-1 space-y-2 min-w-0 pr-8">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className={`text-sm font-semibold leading-tight font-sans ${
                    notif.read ? "text-stone-300" : "text-stone-100"
                  }`}>
                    {notif.title}
                  </h4>
                  <span className={`inline-block px-2 py-0.5 rounded-sm border text-[9px] uppercase tracking-wider font-semibold ${
                    getSeverityBadgeClass(notif.severity)
                  }`}>
                    {notif.category}
                  </span>
                  <span className="text-[10px] text-stone-500 font-sans">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-sans font-light">
                  {notif.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-6 top-6 flex items-center gap-2">
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="p-1 text-stone-500 hover:text-[#F2CA50] transition-colors cursor-pointer"
                    title="Mark as Processed"
                  >
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => handleDismiss(notif.id)}
                  className="p-1 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Dismiss Log"
                >
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="bg-[#161616] border border-white/6 rounded-sm p-16 text-center space-y-4 flex flex-col items-center justify-center">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-stone-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-stone-300 font-serif">Security Logs Completely Clear</h3>
              <p className="text-xs text-stone-500 font-sans max-w-sm">
                There are currently no active alerts or security events registered in the master platform control logs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
