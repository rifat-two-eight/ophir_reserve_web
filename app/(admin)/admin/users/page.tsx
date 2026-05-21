"use client";

import { useState } from "react";

const stats = [
  {
    label: "Total Users",
    value: "128",
    highlight: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    label: "Active Users",
    value: "28",
    highlight: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Pending Users",
    value: "100",
    highlight: false,
    accent: "red",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

type UserStatus = "Active" | "Under Review" | "Suspended";

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  activeEvents: number;
  status: UserStatus;
  avatar: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Julian Thorne", role: "Global Logistics Partner", email: "j.thorne@thorne-estates.com", activeEvents: 14, status: "Active", avatar: "JT" },
  { id: 2, name: "Elena Moretti", role: "Maison Events Lead", email: "e.moretti@heritage-curators.it", activeEvents: 28, status: "Active", avatar: "EM" },
  { id: 3, name: "Sebastian Vane", role: "Private Equity Liaison", email: "vane.s@vane-holdings.co.uk", activeEvents: 5, status: "Under Review", avatar: "SV" },
  { id: 4, name: "Isabella Roche", role: "Art Basel Coordinator", email: "roche.bella@art-curate.fr", activeEvents: 19, status: "Active", avatar: "IR" },
  { id: 5, name: "Marcus Sterling", role: "Asset Security Lead", email: "m.sterling@sterling-security.com", activeEvents: 2, status: "Suspended", avatar: "MS" },
  { id: 6, name: "Amara Osei", role: "Cultural Liaison Director", email: "a.osei@osei-heritage.com", activeEvents: 11, status: "Active", avatar: "AO" },
  { id: 7, name: "Viktor Reinholt", role: "Nordic Estate Manager", email: "v.reinholt@reinholt-nordic.se", activeEvents: 7, status: "Under Review", avatar: "VR" },
  { id: 8, name: "Celeste Aurore", role: "Prestige Events Curator", email: "c.aurore@aurore-prestige.fr", activeEvents: 33, status: "Active", avatar: "CA" },
  { id: 9, name: "Tariq Al-Rashid", role: "Gulf Region Director", email: "t.rashid@rashid-ventures.ae", activeEvents: 9, status: "Active", avatar: "TA" },
  { id: 10, name: "Yuki Hashimoto", role: "East Asia Heritage Lead", email: "y.hashimoto@hashimoto-heritage.jp", activeEvents: 22, status: "Suspended", avatar: "YH" },
];

const statusConfig: Record<UserStatus, { label: string; classes: string }> = {
  Active: { label: "Active", classes: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20" },
  "Under Review": { label: "Under Review", classes: "bg-amber-500/15 text-amber-300 border-amber-500/20" },
  Suspended: { label: "Suspended", classes: "bg-red-500/15 text-red-300 border-red-500/20" },
};

const avatarColors: Record<string, string> = {
  JT: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  EM: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  SV: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  IR: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  MS: "bg-stone-500/20 text-stone-300 border-stone-500/30",
  AO: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  VR: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  CA: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  TA: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  YH: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const ROWS_PER_PAGE = 10;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All Statuses" | UserStatus>("All Statuses");
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalUsers = 1248;
  const totalPages = 125;

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Statuses" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (userId: number, newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    setActionMenuId(null);
  };

  const paginationPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-7 w-full" onClick={() => { setActionMenuId(null); setFilterOpen(false); }}>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-[#161616] border rounded-sm p-7 flex flex-col gap-4 transition-colors duration-200 ${stat.highlight
              ? "border-[#F2CA50]/30 hover:border-[#F2CA50]/50"
              : stat.accent === "red"
                ? "border-red-500/25 hover:border-red-500/40"
                : "border-white/6 hover:border-white/12"
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                {stat.label}
              </span>
              <span className={stat.highlight ? "text-[#F2CA50]/50" : stat.accent === "red" ? "text-red-400/50" : "text-stone-600"}>
                {stat.icon}
              </span>
            </div>
            <p
              className={`text-3xl font-semibold font-serif mt-1 ${stat.highlight
                ? "text-[#F2CA50]"
                : stat.accent === "red"
                  ? "text-red-400"
                  : "text-stone-100"
                }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#F2CA50] font-serif tracking-wide">User Management</h2>
          <p className="text-xs text-stone-500 font-sans mt-1 tracking-wide">
            Oversee and manage the platform's elite user base and event organizers.
          </p>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2.5 text-xs bg-white/5 border border-white/8 focus:border-[#F2CA50]/40 text-stone-300 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans w-56"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setFilterOpen((p) => !p); }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] bg-white/5 border border-white/8 hover:border-white/15 text-stone-400 rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              {statusFilter}
              <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-1.5 z-20 bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl min-w-[160px] overflow-hidden">
                {(["All Statuses", "Active", "Under Review", "Suspended"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={(e) => { e.stopPropagation(); setStatusFilter(s); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${statusFilter === s ? "text-[#F2CA50] bg-[#F2CA50]/8" : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">User</th>
                <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Email</th>
                <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Active Events</th>
                <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Account Status</th>
                <th className="text-center px-6 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-white/2 transition-colors duration-150">
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-bold font-sans ${avatarColors[user.avatar] ?? "bg-stone-800 text-stone-400 border-stone-700"}`}>
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm text-stone-200 font-semibold">{user.name}</p>
                        <p className="text-stone-600 text-xs mt-0.5">{user.role}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-stone-400 text-xs">{user.email}</td>

                  {/* Active Events */}
                  <td className="px-5 py-4 text-stone-300 text-sm font-semibold">
                    {String(user.activeEvents).padStart(2, "0")}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-sm border text-xs uppercase tracking-wider font-semibold ${statusConfig[user.status].classes}`}>
                      {statusConfig[user.status].label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActionMenuId(actionMenuId === user.id ? null : user.id)}
                      className="h-8 w-8 mx-auto flex items-center justify-center rounded-sm hover:bg-white/8 text-stone-500 hover:text-stone-300 transition-all duration-150 cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>

                    {actionMenuId === user.id && (
                      <div className="absolute right-6 top-full mt-1 z-30 bg-[#1c1c1c] border border-white/10 rounded-sm shadow-2xl min-w-[160px] overflow-hidden">
                        <div className="px-3 py-2 border-b border-white/5">
                          <p className="text-[10px] uppercase tracking-widest text-stone-600 font-sans font-semibold">Set Status</p>
                        </div>
                        <button
                          onClick={() => handleStatusChange(user.id, "Active")}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-emerald-400 hover:bg-emerald-500/8 transition-colors duration-150 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(user.id, "Under Review")}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-amber-400 hover:bg-amber-500/8 transition-colors duration-150 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          Under Review
                        </button>
                        <button
                          onClick={() => handleStatusChange(user.id, "Suspended")}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-red-400 hover:bg-red-500/8 transition-colors duration-150 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          Suspended
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-stone-500 font-sans">
            Showing 1–{Math.min(ROWS_PER_PAGE, filtered.length)} of {totalUsers.toLocaleString()} users
          </p>
          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {paginationPages().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="h-8 w-8 flex items-center justify-center text-xs text-stone-600 font-sans">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`h-8 w-8 flex items-center justify-center rounded-sm text-xs font-sans font-semibold transition-all duration-150 cursor-pointer ${currentPage === page
                    ? "bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50]"
                    : "border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20"
                    }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}