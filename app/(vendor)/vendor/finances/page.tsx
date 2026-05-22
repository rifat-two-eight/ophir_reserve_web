"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const transactions = [
    {
        id: 1,
        vendor: "Julianna Sterling",
        initials: "JS",
        service: "Heritage Garden Gala",
        date: "Oct 14, 2024",
        status: "Paid",
        amount: 18500,
    },
    {
        id: 2,
        vendor: "Arthur Montgomery",
        initials: "AM",
        service: "Black Tie Dinner Soirée",
        date: "Nov 2, 2024",
        status: "Pending",
        amount: 12400,
    },
    {
        id: 3,
        vendor: "Elena Costas",
        initials: "EC",
        service: "Coastal Farewell Ceremony",
        date: "Nov 15, 2024",
        status: "Pending",
        amount: 22000,
    },
    {
        id: 4,
        vendor: "Sebastian Voss",
        initials: "SV",
        service: "Rooftop Cocktail Evening",
        date: "Sep 28, 2024",
        status: "Paid",
        amount: 9800,
    },
    {
        id: 5,
        vendor: "Camille Rousseau",
        initials: "CR",
        service: "Private Wine Tasting",
        date: "Sep 10, 2024",
        status: "Paid",
        amount: 6200,
    },
    {
        id: 6,
        vendor: "Marcus Whitfield",
        initials: "MW",
        service: "Corporate Anniversary Gala",
        date: "Dec 5, 2024",
        status: "Overdue",
        amount: 31000,
    },
    {
        id: 7,
        vendor: "Isabelle Fontaine",
        initials: "IF",
        service: "Intimate Wedding Reception",
        date: "Oct 30, 2024",
        status: "Paid",
        amount: 14600,
    },
];

const paymentMethods = [
    {
        id: 1,
        type: "visa",
        label: "Visa",
        last4: "4291",
        expiry: "08 / 27",
        isDefault: true,
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="4" fill="#1A1F71" />
                <path d="M13.5 21H10.5L12.5 11H15.5L13.5 21Z" fill="white" />
                <path d="M22.5 11.3C21.9 11.1 21 11 19.9 11C17 11 14.9 12.5 14.9 14.6C14.9 16.2 16.3 17.1 17.4 17.6C18.5 18.1 18.9 18.5 18.9 19C18.9 19.8 17.9 20.2 17 20.2C15.8 20.2 15.2 20 14.1 19.5L13.7 19.3L13.3 22C14.1 22.4 15.5 22.7 17 22.7C20.1 22.7 22.2 21.2 22.2 19C22.2 17.8 21.4 16.8 19.9 16C18.9 15.5 18.3 15.2 18.3 14.6C18.3 14.1 18.9 13.5 20.1 13.5C21.1 13.5 21.8 13.7 22.3 13.9L22.6 14L22.5 11.3Z" fill="white" />
                <path d="M27 11H24.7C24 11 23.5 11.2 23.2 11.9L19 21H22.1L22.7 19.3H26.4L26.7 21H29.5L27 11ZM23.6 17.1C23.8 16.5 24.8 13.9 24.8 13.9C24.8 13.9 25.1 13.1 25.2 12.6L25.4 13.8C25.4 13.8 26 16.5 26.2 17.1H23.6Z" fill="white" />
                <path d="M9 11L6.1 18.2L5.8 16.9C5.2 14.9 3.4 12.7 1.3 11.6L4 21H7.2L11.8 11H9Z" fill="white" />
                <path d="M3.5 11H1L0.9 11.6C4.5 12.5 6.9 14.9 7.8 17.7L6.9 12C6.7 11.3 6.2 11.1 5.5 11H3.5Z" fill="#FAA61A" />
            </svg>
        ),
    },
    {
        id: 2,
        type: "mastercard",
        label: "Mastercard",
        last4: "8872",
        expiry: "03 / 26",
        isDefault: false,
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="4" fill="#252525" />
                <circle cx="12" cy="16" r="7" fill="#EB001B" />
                <circle cx="20" cy="16" r="7" fill="#F79E1B" />
                <path d="M16 10.5C17.7 11.7 18.9 13.7 18.9 16C18.9 18.3 17.7 20.3 16 21.5C14.3 20.3 13.1 18.3 13.1 16C13.1 13.7 14.3 11.7 16 10.5Z" fill="#FF5F00" />
            </svg>
        ),
    },
    {
        id: 3,
        type: "bank",
        label: "Bank Transfer",
        last4: "3310",
        expiry: "Heritage National Bank",
        isDefault: false,
        icon: (
            <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
            </svg>
        ),
    },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function FinanceCard({
    label,
    value,
    sub,
    gold,
    icon,
    trend,
}: {
    label: string;
    value: string;
    sub: string;
    gold?: boolean;
    trend?: "up" | "neutral" | "down";
    icon: React.ReactNode;
}) {
    return (
        <div
            className={`relative flex flex-col gap-4 rounded-sm p-6 bg-[#161616] overflow-hidden transition-all duration-300 hover:bg-[#1a1a1a] ${gold
                ? "border border-[#F2CA50]/30"
                : "border border-white/5 hover:border-white/10"
                }`}
        >
            {gold && <div className="absolute inset-0 bg-[#F2CA50]/3 pointer-events-none" />}

            <div className="flex items-start justify-between">
                <div
                    className={`h-10 w-10 flex items-center justify-center rounded-sm ${gold
                        ? "bg-[#F2CA50]/15 border border-[#F2CA50]/25 text-[#F2CA50]"
                        : "bg-white/5 border border-white/8 text-stone-400"
                        }`}
                >
                    {icon}
                </div>

                
            </div>

            <div>
                <p
                    className={`text-3xl font-semibold font-serif leading-none ${gold ? "text-[#F2CA50]" : "text-stone-100"
                        }`}
                >
                    {value}
                </p>
                <p className="text-xs text-stone-500 font-sans mt-1.5 uppercase tracking-widest">
                    {label}
                </p>
            </div>
            <p className="text-xs text-stone-600 font-sans">{sub}</p>
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        Paid: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
        Pending: "bg-amber-500/10 border border-amber-500/20 text-amber-400",
        Overdue: "bg-red-500/10 border border-red-500/20 text-red-400",
    };
    return (
        <span
            className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm font-sans font-semibold ${map[status] ?? "bg-white/5 text-stone-500 border border-white/8"
                }`}
        >
            {status}
        </span>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VendorFinancesPage() {
    const [filter, setFilter] = useState<"All" | "Paid" | "Pending" | "Overdue">(
        "All"
    );

    const totalEarning = 114600;
    const totalPaid = 49100;
    const pendingPayment = 65500;

    const filtered =
        filter === "All"
            ? transactions
            : transactions.filter((t) => t.status === filter);

    const filters = ["All", "Paid", "Pending", "Overdue"] as const;

    return (
        <div className="space-y-6 w-full">

            {/* ── Top Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FinanceCard
                    label="Total Earnings"
                    value="$114,600"
                    sub="+18.4% from last period"
                    gold
                    trend="up"
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
                <FinanceCard
                    label="Total Paid"
                    value="$49,100"
                    sub="4 transactions settled"
                    trend="up"
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
                <FinanceCard
                    label="Pending Payment"
                    value="$65,500"
                    sub="3 transactions awaiting"
                    trend="down"
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* ── Transactions Table ── */}
            <div className="bg-[#161616] border border-white/5 rounded-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/5">
                    <h3 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
                        Transaction History
                    </h3>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`text-[9px] uppercase tracking-[0.15em] font-sans font-semibold px-3 py-1.5 rounded-sm border transition-all duration-200 cursor-pointer ${filter === f
                                    ? "bg-[#F2CA50]/15 border-[#F2CA50]/30 text-[#F2CA50]"
                                    : "border-white/8 text-stone-500 hover:text-stone-300 hover:border-white/15"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Vendor", "Service", "Date", "Status", "Amount", "Action"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-6 py-3.5 text-left text-[9px] uppercase tracking-[0.15em] text-stone-600 font-sans font-semibold"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filtered.map((tx) => (
                                <tr
                                    key={tx.id}
                                    className="hover:bg-white/[0.02] transition-colors duration-200"
                                >
                                    {/* Vendor */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center">
                                                <span className="text-[10px] font-semibold text-[#F2CA50] font-sans">
                                                    {tx.initials}
                                                </span>
                                            </div>
                                            <span className="text-sm text-stone-300 font-sans font-medium truncate">
                                                {tx.vendor}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Service */}
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-stone-500 font-sans">{tx.service}</span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-stone-600 font-sans">{tx.date}</span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <StatusBadge status={tx.status} />
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-sm font-semibold font-sans ${tx.status === "Paid"
                                                ? "text-emerald-400"
                                                : tx.status === "Overdue"
                                                    ? "text-red-400"
                                                    : "text-stone-300"
                                                }`}
                                        >
                                            ${tx.amount.toLocaleString()}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* View Details */}
                                            <button
                                                title="View Details"
                                                className="h-7 w-7 flex items-center justify-center border border-white/10 text-stone-500 hover:border-[#F2CA50]/30 hover:text-[#F2CA50] hover:bg-[#F2CA50]/8 rounded-sm transition-all duration-200 cursor-pointer flex-shrink-0"
                                            >
                                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </button>
                                            <button className="text-[9px] uppercase tracking-[0.12em] font-sans font-semibold px-3 py-1.5 border border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-300 rounded-sm transition-all duration-200 cursor-pointer">
                                                Invoice
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] text-stone-600 font-sans uppercase tracking-widest">
                        Showing {filtered.length} of {transactions.length} transactions
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="text-[9px] uppercase tracking-[0.12em] font-sans font-semibold px-3 py-1.5 border border-white/8 text-stone-600 hover:text-stone-400 hover:border-white/15 rounded-sm transition-all duration-200 cursor-pointer">
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Payment Methods ── */}
            <div className="bg-[#161616] border border-white/5 rounded-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <div>
                        <h3 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
                            Payment Methods
                        </h3>
                        <p className="text-xs text-stone-500 font-sans mt-1">
                            Manage your saved payment instruments
                        </p>
                    </div>
                    <button className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold px-4 py-2 bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50] hover:bg-[#F2CA50]/25 hover:border-[#F2CA50]/50 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Method
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {paymentMethods.map((pm) => (
                        <div
                            key={pm.id}
                            className={`relative flex flex-col gap-4 p-5 rounded-sm border transition-all duration-200 hover:bg-white/[0.02] cursor-pointer ${pm.isDefault
                                ? "border-[#F2CA50]/25 bg-[#F2CA50]/3"
                                : "border-white/8 hover:border-white/12"
                                }`}
                        >
                            {pm.isDefault && (
                                <span className="absolute top-3.5 right-3.5 text-[8px] uppercase tracking-[0.15em] font-sans font-semibold px-2 py-0.5 bg-[#F2CA50]/15 border border-[#F2CA50]/25 text-[#F2CA50] rounded-sm">
                                    Default
                                </span>
                            )}

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 flex items-center justify-center rounded-sm bg-white/5 border border-white/8 flex-shrink-0">
                                    {pm.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-stone-200 font-sans">
                                        {pm.label} ···· {pm.last4}
                                    </p>
                                    <p className="text-[10px] text-stone-600 font-sans mt-0.5 uppercase tracking-wide">
                                        {pm.expiry}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                                {!pm.isDefault && (
                                    <button className="text-[9px] uppercase tracking-[0.12em] font-sans font-semibold px-2.5 py-1.5 border border-white/8 text-stone-500 hover:text-stone-300 hover:border-white/15 rounded-sm transition-all duration-200 cursor-pointer">
                                        Set Default
                                    </button>
                                )}
                                <button className="text-[9px] uppercase tracking-[0.12em] font-sans font-semibold px-2.5 py-1.5 border border-white/8 text-stone-500 hover:text-stone-300 hover:border-white/15 rounded-sm transition-all duration-200 cursor-pointer">
                                    Edit
                                </button>
                                <button className="ml-auto text-[9px] uppercase tracking-[0.12em] font-sans font-semibold px-2.5 py-1.5 border border-red-500/15 text-red-500/60 hover:text-red-400 hover:border-red-500/30 rounded-sm transition-all duration-200 cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}