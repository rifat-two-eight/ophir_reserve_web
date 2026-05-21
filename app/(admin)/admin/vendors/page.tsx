"use client";

import { useState } from "react";

type VendorCategory = "Catering" | "Events" | "Artisan" | "Concierge" | "Heritage";
type VendorStatus = "Active" | "Pending" | "Suspended";

interface Vendor {
  id: number;
  name: string;
  established: string;
  location: string;
  email: string;
  phone: string;
  rating: number;
  revenue: string;
  category: VendorCategory;
  status: VendorStatus;
  image: string;
}

const initialVendors: Vendor[] = [
  { id: 1, name: "Silk Road Catering", established: "Est. 1994", location: "Istanbul", email: "concierge@silkroad.com", phone: "+90 212 555 0192", rating: 4.9, revenue: "$1,240,500", category: "Catering", status: "Active", image: "SR" },
  { id: 2, name: "Aurelia Studio", established: "Est. 2001", location: "London", email: "studio@aurelia.co.uk", phone: "+44 20 7946 0148", rating: 5.0, revenue: "$1,240,500", category: "Events", status: "Active", image: "AS" },
  { id: 3, name: "Kyoto Heritage", established: "Est. 1987", location: "Kyoto", email: "hachiro@kyotoherit.jp", phone: "+81 75 333 0111", rating: 4.8, revenue: "$1,240,500", category: "Heritage", status: "Active", image: "KH" },
  { id: 4, name: "Vanguard Concierge", established: "Est. 2008", location: "Geneva", email: "ops@vanguard.ch", phone: "+41 22 555 0101", rating: 4.7, revenue: "$1,240,500", category: "Concierge", status: "Pending", image: "VC" },
  { id: 5, name: "Marrakech Royal", established: "Est. 1999", location: "Marrakech", email: "royal@marrakech-tents.ma", phone: "+212 524 000 192", rating: 4.6, revenue: "$980,000", category: "Events", status: "Active", image: "MR" },
  { id: 6, name: "Petra Desert Co.", established: "Est. 2015", location: "Amman", email: "petra@desert-exp.jo", phone: "+962 6 555 0134", rating: 4.5, revenue: "$760,200", category: "Heritage", status: "Active", image: "PD" },
  { id: 7, name: "Etoile Curations", established: "Est. 2010", location: "Paris", email: "c.dubois@etoile.fr", phone: "+33 1 44 00 0192", rating: 4.9, revenue: "$2,100,000", category: "Concierge", status: "Active", image: "EC" },
  { id: 8, name: "Nordic Artisan Guild", established: "Est. 1978", location: "Stockholm", email: "guild@nordic-artisan.se", phone: "+46 8 555 0188", rating: 4.3, revenue: "$540,750", category: "Artisan", status: "Suspended", image: "NA" },
  { id: 9, name: "Bosphorus Events", established: "Est. 2003", location: "Istanbul", email: "events@bosphorus.com.tr", phone: "+90 212 555 0267", rating: 4.7, revenue: "$1,030,400", category: "Events", status: "Active", image: "BE" },
  { id: 10, name: "Heritage Maison", established: "Est. 1965", location: "Florence", email: "maison@heritage-it.it", phone: "+39 055 555 0199", rating: 5.0, revenue: "$3,400,000", category: "Heritage", status: "Pending", image: "HM" },
];

const categoryColors: Record<VendorCategory, string> = {
  Catering: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  Events: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Artisan: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  Concierge: "bg-teal-500/15 text-teal-300 border-teal-500/20",
  Heritage: "bg-amber-500/15 text-amber-300 border-amber-500/20",
};

const statusConfig: Record<VendorStatus, { classes: string }> = {
  Active: { classes: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20" },
  Pending: { classes: "bg-amber-500/15 text-amber-300 border-amber-500/20" },
  Suspended: { classes: "bg-red-500/15 text-red-300 border-red-500/20" },
};

const imageColors: Record<string, string> = {
  SR: "bg-orange-500/20 text-orange-200",
  AS: "bg-purple-500/20 text-purple-200",
  KH: "bg-rose-500/20 text-rose-200",
  VC: "bg-blue-500/20 text-blue-200",
  MR: "bg-amber-500/20 text-amber-200",
  PD: "bg-red-500/20 text-red-200",
  EC: "bg-pink-500/20 text-pink-200",
  NA: "bg-slate-500/20 text-slate-200",
  BE: "bg-cyan-500/20 text-cyan-200",
  HM: "bg-emerald-500/20 text-emerald-200",
};

const TOTAL_VENDORS = 128;
const TOTAL_PAGES = 13;
const ROWS_PER_PAGE = 10;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-3.5 w-3.5 text-[#F2CA50] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="text-sm font-semibold text-stone-200 font-sans">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [categoryFilter, setCategoryFilter] = useState<"All" | VendorCategory>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | VendorStatus>("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = vendors.filter((v) => {
    const matchCat = categoryFilter === "All" || v.category === categoryFilter;
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    return matchCat && matchStatus;
  });

  const handleStatusChange = (vendorId: number, newStatus: VendorStatus) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status: newStatus } : v))
    );
    setActionMenuId(null);
  };

  const paginationPages = () => {
    const pages: (number | "...")[] = [];
    if (TOTAL_PAGES <= 5) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(TOTAL_PAGES - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < TOTAL_PAGES - 2) pages.push("...");
      pages.push(TOTAL_PAGES);
    }
    return pages;
  };

  return (
    <div
      className="space-y-5 w-full"
      onClick={() => { setActionMenuId(null); setCategoryOpen(false); setStatusOpen(false); }}
    >
      {/* Filter Bar */}
      <div className="bg-[#161616] border border-white/6 rounded-sm px-6 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold flex-shrink-0">
            Filter By:
          </span>

          {/* Category Filter */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setCategoryOpen((p) => !p); setStatusOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.1em] bg-white/5 border border-white/10 hover:border-white/20 text-stone-300 rounded-sm transition-all duration-200 cursor-pointer"
            >
              Category: {categoryFilter}
              <svg className={`h-3.5 w-3.5 text-stone-500 transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {categoryOpen && (
              <div className="absolute left-0 top-full mt-1.5 z-30 bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl min-w-[160px] overflow-hidden">
                {(["All", "Catering", "Events", "Artisan", "Concierge", "Heritage"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategoryFilter(c); setCategoryOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${categoryFilter === c ? "text-[#F2CA50] bg-[#F2CA50]/8" : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
                      }`}
                  >
                    {c === "All" ? "All Categories" : c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setStatusOpen((p) => !p); setCategoryOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.1em] bg-white/5 border border-white/10 hover:border-white/20 text-stone-300 rounded-sm transition-all duration-200 cursor-pointer"
            >
              Status: {statusFilter}
              <svg className={`h-3.5 w-3.5 text-stone-500 transition-transform duration-200 ${statusOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 z-30 bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl min-w-[160px] overflow-hidden">
                {(["All", "Active", "Pending", "Suspended"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setStatusOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${statusFilter === s ? "text-[#F2CA50] bg-[#F2CA50]/8" : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
                      }`}
                  >
                    {s === "All" ? "All Statuses" : s}
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
              <tr className="border-b border-white/8">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#F2CA50]/70 font-semibold">
                  Vendor Name
                </th>
                <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#F2CA50]/70 font-semibold">
                  Contact
                </th>
                <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#F2CA50]/70 font-semibold">
                  Rating
                </th>
                <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#F2CA50]/70 font-semibold">
                  Revenue
                </th>
                <th className="text-center px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#F2CA50]/70 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-white/2 transition-colors duration-150">
                  {/* Vendor Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`h-11 w-11 rounded-sm flex items-center justify-center flex-shrink-0 text-xs font-bold font-sans ${imageColors[vendor.image] ?? "bg-stone-800 text-stone-300"}`}>
                        {vendor.image}
                      </div>
                      <div>
                        <p className="text-sm text-stone-100 font-semibold leading-snug">{vendor.name}</p>
                        <p className="text-stone-600 text-xs mt-0.5">{vendor.established} · {vendor.location}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-sm border text-[10px] uppercase tracking-wider font-semibold ${categoryColors[vendor.category]}`}>
                          {vendor.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-stone-300 text-xs">{vendor.email}</p>
                    <p className="text-stone-600 text-xs mt-0.5">{vendor.phone}</p>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-4">
                    <StarRating rating={vendor.rating} />
                  </td>

                  {/* Revenue */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#F2CA50] font-serif">{vendor.revenue}</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-600 font-sans mt-0.5">FY24 Gross</p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActionMenuId(actionMenuId === vendor.id ? null : vendor.id)}
                      className="h-8 w-8 mx-auto flex items-center justify-center rounded-sm hover:bg-white/8 text-stone-500 hover:text-stone-300 transition-all duration-150 cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>

                    {actionMenuId === vendor.id && (
                      <div className="absolute right-6 top-full mt-1 z-30 bg-[#1c1c1c] border border-white/10 rounded-sm shadow-2xl min-w-[170px] overflow-hidden">
                        <div className="px-3 py-2 border-b border-white/5">
                          <p className="text-[10px] uppercase tracking-widest text-stone-600 font-sans font-semibold">Set Status</p>
                        </div>
                        <button
                          onClick={() => handleStatusChange(vendor.id, "Active")}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-emerald-400 hover:bg-emerald-500/8 transition-colors duration-150 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(vendor.id, "Pending")}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-amber-400 hover:bg-amber-500/8 transition-colors duration-150 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(vendor.id, "Suspended")}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-red-400 hover:bg-red-500/8 transition-colors duration-150 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          Suspended
                        </button>
                        <div className="border-t border-white/5">
                          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-colors duration-150 cursor-pointer">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Profile
                          </button>
                          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-colors duration-150 cursor-pointer">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Vendor
                          </button>
                        </div>
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
          <p className="text-xs text-stone-500 font-sans uppercase tracking-[0.1em]">
            Showing 1–{Math.min(ROWS_PER_PAGE, filtered.length)} of {TOTAL_VENDORS} Elite Vendors
          </p>
          <div className="flex items-center gap-1">
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

            <button
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
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