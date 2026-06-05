"use client";

import { useState } from "react";

// notification
interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: "bell" | "check" | "dollar" | "star";
}

const allNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Inquiry Received",
    description: "Julianna Sterling submitted an inquiry for the Enchanted Garden Gala (Oct 18, 120 guests).",
    time: "5 minutes ago",
    read: false,
    icon: "bell",
  },
  {
    id: "n2",
    title: "Booking Confirmed",
    description: "Arthur Montgomery confirmed the Black Tie Dinner Soirée for Nov 2. Deposit of $8,400 received.",
    time: "1 hour ago",
    read: false,
    icon: "check",
  },
  {
    id: "n3",
    title: "Payment Settled",
    description: "Final payment of $22,500 cleared for the Heritage Anniversary Gala on Oct 5.",
    time: "3 hours ago",
    read: false,
    icon: "dollar",
  },
  {
    id: "n4",
    title: "New Review Posted",
    description: "Elena Costas left a 5-star review: \"Absolutely impeccable service — exceeded every expectation.\"",
    time: "Yesterday",
    read: true,
    icon: "star",
  },
  {
    id: "n5",
    title: "Inquiry Follow-up Reminder",
    description: "You have an unanswered inquiry from Harrington Estate that is 48 hours old. Consider following up.",
    time: "Yesterday",
    read: true,
    icon: "bell",
  },
  {
    id: "n6",
    title: "Booking Request Pending",
    description: "A new booking request for the Winter Soirée (Dec 14, 95 guests) is awaiting your approval.",
    time: "2 days ago",
    read: true,
    icon: "check",
  },
  {
    id: "n7",
    title: "Revenue Milestone Reached",
    description: "Congratulations — your account has crossed $100,000 in total earnings this season.",
    time: "3 days ago",
    read: true,
    icon: "dollar",
  },
  {
    id: "n8",
    title: "Profile Completeness Alert",
    description: "Your vendor profile is 85% complete. Add portfolio images to attract more high-value clients.",
    time: "4 days ago",
    read: true,
    icon: "star",
  },
];

const PAGE_SIZE = 5;

function NotifIcon({ type }: { type: Notification["icon"] }) {
  switch (type) {
    case "check":
      return (
        <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "dollar":
      return (
        <svg className="h-5 w-5 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "star":
      return (
        <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      );
  }
}

export default function VendorNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [page, setPage] = useState(1);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalPages = Math.ceil(notifications.length / PAGE_SIZE);
  const paged = notifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F2CA50]/60 font-sans mb-1">
            Vendor Portal
          </p>
          <h2 className="text-2xl font-semibold text-stone-100 font-serif tracking-wide">
            Notifications
          </h2>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[10px] uppercase tracking-[0.12em] font-sans font-semibold px-4 py-2.5 border border-white/8 text-stone-400 hover:border-[#F2CA50]/30 hover:text-stone-200 rounded-sm transition-all duration-200 cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Unread badge */}
      {unreadCount > 0 && (
        <p className="text-xs text-stone-500 font-sans">
          <span className="text-[#F2CA50] font-semibold">{unreadCount}</span> unread notification{unreadCount !== 1 ? "s" : ""}
        </p>
      )}

      <div className="space-y-2">
        {paged.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-4 px-5 py-4 rounded-sm border transition-all duration-200 ${notif.read
              ? "bg-[#161616] border-white/5"
              : "bg-[#161616] border-[#F2CA50]/15 border-l-2 border-l-[#F2CA50]"
              }`}
          >
            {/* Icon */}
            <div className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-sm bg-white/5 border border-white/8 mt-0.5">
              <NotifIcon type={notif.icon} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className={`text-sm font-semibold font-sans leading-snug ${notif.read ? "text-stone-400" : "text-stone-100"}`}>
                  {notif.title}
                </p>
                <span className="text-[10px] text-stone-600 font-sans whitespace-nowrap flex-shrink-0 mt-0.5">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans mt-1 leading-relaxed">
                {notif.description}
              </p>
            </div>

            {/* Mark as read */}
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                title="Mark as read"
                className="flex-shrink-0 mt-0.5 p-1.5 text-stone-600 hover:text-[#F2CA50] transition-colors duration-200 cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-stone-600 font-sans">
            Page {page} of {totalPages} · {notifications.length} notifications
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:border-[#F2CA50]/30 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-8 w-8 flex items-center justify-center rounded-sm text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${p === page
                  ? "bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50]"
                  : "border border-white/8 text-stone-500 hover:border-white/15 hover:text-stone-300"
                  }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:border-[#F2CA50]/30 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
