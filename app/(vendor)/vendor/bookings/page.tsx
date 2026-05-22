"use client";

import { useState } from "react";
import {
    CalendarDays,
    Clock,
    CheckCircle2,
    DollarSign,
    Search,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type BookingStatus = "Confirmed" | "Pending" | "Cancelled";
type ServiceType =
    | "Wedding"
    | "Corporate"
    | "Gala"
    | "Private Dining"
    | "Heritage Tour"
    | "Concierge";

interface Booking {
    id: string;
    clientName: string;
    clientRole: string;
    clientInitials: string;
    service: ServiceType;
    date: string;
    status: BookingStatus;
    amount: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const allBookings: Booking[] = [
    { id: "#OR-29401", clientName: "Sharifa Johr", clientRole: "Drummer", clientInitials: "SJ", service: "Wedding", date: "Nov 14, 2024", status: "Confirmed", amount: "$1,850.00" },
    { id: "#OR-29402", clientName: "Alaric Thorne", clientRole: "Event Host", clientInitials: "AT", service: "Gala", date: "Nov 14, 2024", status: "Confirmed", amount: "$4,200.00" },
    { id: "#OR-29403", clientName: "Elena Moretti", clientRole: "Art Curator", clientInitials: "EM", service: "Private Dining", date: "Nov 15, 2024", status: "Pending", amount: "$980.00" },
    { id: "#OR-29404", clientName: "Julian Waters", clientRole: "Estate Manager", clientInitials: "JW", service: "Heritage Tour", date: "Nov 15, 2024", status: "Confirmed", amount: "$3,100.00" },
    { id: "#OR-29405", clientName: "Isabella Roche", clientRole: "Coordinator", clientInitials: "IR", service: "Wedding", date: "Nov 16, 2024", status: "Confirmed", amount: "$1,850.00" },
    { id: "#OR-29406", clientName: "Marcus Bell", clientRole: "Valet Lead", clientInitials: "MB", service: "Corporate", date: "Nov 17, 2024", status: "Pending", amount: "$2,400.00" },
    { id: "#OR-29407", clientName: "Olivia Park", clientRole: "Lighting Dir.", clientInitials: "OP", service: "Concierge", date: "Nov 18, 2024", status: "Confirmed", amount: "$1,200.00" },
    { id: "#OR-29408", clientName: "Hugo Knight", clientRole: "Sommelier", clientInitials: "HK", service: "Private Dining", date: "Nov 19, 2024", status: "Cancelled", amount: "$760.00" },
    { id: "#OR-29409", clientName: "Eva Sterling", clientRole: "Entertainment", clientInitials: "ES", service: "Gala", date: "Nov 20, 2024", status: "Confirmed", amount: "$5,500.00" },
    { id: "#OR-29410", clientName: "David Knox", clientRole: "Logistics", clientInitials: "DK", service: "Corporate", date: "Nov 21, 2024", status: "Pending", amount: "$1,640.00" },
    { id: "#OR-29411", clientName: "Cassandra Le", clientRole: "Security", clientInitials: "CL", service: "Wedding", date: "Nov 22, 2024", status: "Confirmed", amount: "$1,850.00" },
    { id: "#OR-29412", clientName: "Victor Reinholt", clientRole: "Nordic Curator", clientInitials: "VR", service: "Heritage Tour", date: "Nov 23, 2024", status: "Confirmed", amount: "$2,900.00" },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const statusConfig: Record<BookingStatus, { text: string; bg: string; border: string }> = {
    Confirmed: { text: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/25" },
    Pending: { text: "text-amber-300", bg: "bg-amber-500/15", border: "border-amber-500/25" },
    Cancelled: { text: "text-red-300", bg: "bg-red-500/15", border: "border-red-500/25" },
};

const avatarColors: Record<string, string> = {
    SJ: "bg-rose-500/20 text-rose-300", AT: "bg-violet-500/20 text-violet-300",
    EM: "bg-purple-500/20 text-purple-300", JW: "bg-orange-500/20 text-orange-300",
    IR: "bg-pink-500/20 text-pink-300", MB: "bg-blue-500/20 text-blue-300",
    OP: "bg-teal-500/20 text-teal-300", HK: "bg-amber-500/20 text-amber-300",
    ES: "bg-indigo-500/20 text-indigo-300", DK: "bg-stone-500/20 text-stone-300",
    CL: "bg-cyan-500/20 text-cyan-300", VR: "bg-emerald-500/20 text-emerald-300",
};

const ROWS_PER_PAGE = 7;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VendorBookingsPage() {
    const [tab, setTab] = useState<"ALL" | "UPCOMING">("ALL");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [actionMenu, setActionMenu] = useState<string | null>(null);

    // filter
    const now = new Date("2024-11-14");
    const source = tab === "UPCOMING"
        ? allBookings.filter((b) => new Date(b.date) >= now && b.status !== "Cancelled")
        : allBookings;

    const filtered = source.filter(
        (b) =>
            b.clientName.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase()) ||
            b.service.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginated = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

    const stats = [
        {
            label: "Total Bookings",
            value: "124",
            Icon: CalendarDays,
            valueColor: "text-[#F2CA50]",
            border: "border-[#F2CA50]/20 hover:border-[#F2CA50]/35",
        },
        {
            label: "Pending",
            value: "18",
            Icon: Clock,
            valueColor: "text-stone-100",
            border: "border-white/6 hover:border-white/12",
        },
        {
            label: "Confirmed",
            value: "76",
            Icon: CheckCircle2,
            valueColor: "text-stone-100",
            border: "border-white/6 hover:border-white/12",
        },
        {
            label: "Revenue",
            value: "$12,480",
            Icon: DollarSign,
            valueColor: "text-[#F2CA50]",
            border: "border-[#F2CA50]/20 hover:border-[#F2CA50]/35",
        },
    ];

    const paginationItems = (): (number | "...")[] => {
        if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (safePage <= 2) return [1, 2, 3, "...", totalPages];
        if (safePage >= totalPages - 1) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
    };

    return (
        <div
            className="space-y-6 w-full"
            onClick={() => setActionMenu(null)}
        >
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className={`bg-[#161616] border ${s.border} rounded-sm p-6 flex flex-col gap-4 transition-colors duration-200`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                                {s.label}
                            </span>
                            <s.Icon className="h-4 w-4 text-stone-600" strokeWidth={1.5} />
                        </div>
                        <p className={`text-3xl font-semibold font-serif ${s.valueColor}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* ── Table Card ── */}
            <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-white/5">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-sm p-1 w-fit">
                        {(["ALL", "UPCOMING"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTab(t); setCurrentPage(1); }}
                                className={`px-4 py-2 text-[10px] font-sans font-semibold uppercase tracking-[0.12em] rounded-sm transition-all duration-200 cursor-pointer ${tab === t
                                        ? "bg-[#F2CA50] text-[#111111]"
                                        : "text-stone-500 hover:text-stone-300"
                                    }`}
                            >
                                {t === "ALL" ? "All Bookings" : "Upcoming"}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-600" strokeWidth={2} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            placeholder="Search registry..."
                            className="pl-10 pr-4 py-2.5 text-xs bg-white/5 border border-white/8 focus:border-[#F2CA50]/40 text-stone-300 placeholder-stone-600 rounded-sm outline-none transition-all duration-200 font-sans w-56 lg:w-72"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-xs font-sans">
                        <thead>
                            <tr className="border-b border-white/5">
                                {[
                                    { label: "Booking ID", align: "text-left" },
                                    { label: "Client", align: "text-left" },
                                    { label: "Service", align: "text-left" },
                                    { label: "Date", align: "text-left" },
                                    { label: "Status", align: "text-left" },
                                    { label: "Amount", align: "text-right" },
                                    { label: "Action", align: "text-center" },
                                ].map((h) => (
                                    <th
                                        key={h.label}
                                        className={`px-5 py-3.5 text-[10px] uppercase tracking-[0.12em] text-stone-500 font-semibold ${h.align}`}
                                    >
                                        {h.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/4">
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-12 text-center text-stone-600 text-xs font-sans">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((b) => {
                                    const sc = statusConfig[b.status];
                                    return (
                                        <tr key={b.id} className="hover:bg-white/2 transition-colors duration-150">

                                            {/* Booking ID */}
                                            <td className="px-5 py-4 text-[#F2CA50] font-semibold text-xs whitespace-nowrap">
                                                {b.id}
                                            </td>

                                            {/* Client */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${avatarColors[b.clientInitials] ?? "bg-stone-800 text-stone-300"}`}>
                                                        {b.clientInitials}
                                                    </div>
                                                    <div>
                                                        <p className="text-stone-200 font-semibold text-xs leading-snug">{b.clientName}</p>
                                                        <p className="text-stone-600 text-[10px] uppercase tracking-wider mt-0.5">{b.clientRole}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Service */}
                                            <td className="px-5 py-4 text-stone-300 text-sm font-sans">{b.service}</td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-stone-400 text-xs whitespace-nowrap">{b.date}</td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span className={`inline-block px-2.5 py-1 rounded-sm border text-[10px] uppercase tracking-wider font-semibold ${sc.bg} ${sc.border} ${sc.text}`}>
                                                    {b.status}
                                                </span>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-5 py-4 text-right text-sm font-semibold text-[#F2CA50] font-serif whitespace-nowrap">
                                                {b.amount}
                                            </td>

                                            {/* Action */}
                                            <td
                                                className="px-5 py-4 text-center relative"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => setActionMenu(actionMenu === b.id ? null : b.id)}
                                                    className="h-8 w-8 mx-auto flex items-center justify-center rounded-sm hover:bg-white/8 text-stone-500 hover:text-stone-300 transition-all duration-150 cursor-pointer"
                                                >
                                                    <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
                                                </button>

                                                {actionMenu === b.id && (
                                                    <div className="absolute right-5 top-full mt-1 z-30 bg-[#1c1c1c] border border-white/10 rounded-sm shadow-2xl min-w-[150px] overflow-hidden">
                                                        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-colors duration-150 cursor-pointer">
                                                            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                                                            View Details
                                                        </button>
                                                        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-colors duration-150 cursor-pointer">
                                                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
                                                            Edit Booking
                                                        </button>
                                                        <div className="border-t border-white/5">
                                                            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-sans font-semibold text-red-400 hover:bg-red-500/8 transition-colors duration-150 cursor-pointer">
                                                                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                                                                Cancel Booking
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-stone-500 font-sans">
                        Showing {Math.min(ROWS_PER_PAGE, paginated.length)} of {filtered.length} records
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>

                        {paginationItems().map((page, idx) =>
                            page === "..." ? (
                                <span key={`e-${idx}`} className="h-8 w-8 flex items-center justify-center text-xs text-stone-600 font-sans">
                                    …
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page as number)}
                                    className={`h-8 w-8 flex items-center justify-center rounded-sm text-xs font-sans font-semibold transition-all duration-150 cursor-pointer ${safePage === page
                                            ? "bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50]"
                                            : "border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                        >
                            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}