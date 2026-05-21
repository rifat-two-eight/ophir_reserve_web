"use client";

import { useState } from "react";
import {
  DollarSign,
  BarChart3,
  Percent,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
type TxStatus = "Success" | "Processing" | "Failed" | "Refunded";
type TxCategory =
  | "Score Import"
  | "Backstage"
  | "Media Sync"
  | "Venue Hire"
  | "Security"
  | "Logistics"
  | "Lighting"
  | "Catering"
  | "Entertainment";

interface Transaction {
  id: string;
  clientName: string;
  clientInitials: string;
  vendor: string;
  category: TxCategory;
  amount: string;
  status: TxStatus;
  date: string;
  time: string;
}

// ─── Chart Data ───────────────────────────────────────────────────────────────
const dailyData = [
  { label: "Oct 13", value: 18 }, { label: "Oct 14", value: 25 }, { label: "Oct 15", value: 32 },
  { label: "Oct 16", value: 48 }, { label: "Oct 17", value: 65 }, { label: "Oct 18", value: 84 },
  { label: "Oct 19", value: 112 }, { label: "Oct 20", value: 134 }, { label: "Oct 21", value: 152 },
  { label: "Oct 22", value: 162 }, { label: "Oct 23", value: 156 }, { label: "Oct 24", value: 144 },
  { label: "Oct 25", value: 128 }, { label: "Oct 26", value: 112 }, { label: "Oct 27", value: 98 },
  { label: "Oct 28", value: 86 }, { label: "Oct 29", value: 74 }, { label: "Oct 30", value: 70 },
  { label: "Oct 31", value: 74 }, { label: "Nov 01", value: 82 },
];
const weeklyData = [
  { label: "W1 Sep", value: 55 }, { label: "W2 Sep", value: 72 }, { label: "W3 Sep", value: 88 },
  { label: "W4 Sep", value: 104 }, { label: "W1 Oct", value: 116 }, { label: "W2 Oct", value: 128 },
  { label: "W3 Oct", value: 124 }, { label: "W4 Oct", value: 118 }, { label: "W1 Nov", value: 122 },
];
const monthlyData = [
  { label: "Apr", value: 60 }, { label: "May", value: 78 }, { label: "Jun", value: 92 },
  { label: "Jul", value: 108 }, { label: "Aug", value: 122 }, { label: "Sep", value: 134 },
  { label: "Oct", value: 128 }, { label: "Nov", value: 118 },
];

// ─── Transactions ─────────────────────────────────────────────────────────────
const transactions: Transaction[] = [
  { id: "#TX-8821", clientName: "Alaric Thorne", clientInitials: "AT", vendor: "Aurelia Florals", category: "Score Import", amount: "$12,500.00", status: "Success", date: "Oct 24", time: "11:12 GMT" },
  { id: "#TX-8822", clientName: "Seraphina Moon", clientInitials: "SM", vendor: "Luxe Catering Co.", category: "Backstage", amount: "$45,200.00", status: "Success", date: "Oct 24", time: "11:48 GMT" },
  { id: "#TX-8823", clientName: "Elise Vance", clientInitials: "EV", vendor: "Noir Sound Systems", category: "Media Sync", amount: "$8,900.00", status: "Processing", date: "Oct 25", time: "09:05 GMT" },
  { id: "#TX-8824", clientName: "Julian Waters", clientInitials: "JW", vendor: "Opal Venues", category: "Venue Hire", amount: "$120,000.00", status: "Failed", date: "Oct 25", time: "10:52 GMT" },
  { id: "#TX-8825", clientName: "Cassandra Le", clientInitials: "CL", vendor: "Velvet Security", category: "Security", amount: "$5,400.00", status: "Success", date: "Oct 26", time: "02:41 GMT" },
  { id: "#TX-8826", clientName: "Marcus Bell", clientInitials: "MB", vendor: "Elite Valet", category: "Logistics", amount: "$3,200.00", status: "Success", date: "Oct 26", time: "10:40 GMT" },
  { id: "#TX-8827", clientName: "Olivia Park", clientInitials: "OP", vendor: "Prism Lighting", category: "Lighting", amount: "$15,800.00", status: "Success", date: "Oct 26", time: "10:46 GMT" },
  { id: "#TX-8828", clientName: "Hugo Knight", clientInitials: "HK", vendor: "The Vintner List", category: "Catering", amount: "$22,300.00", status: "Success", date: "Oct 29", time: "05:30 GMT" },
  { id: "#TX-8829", clientName: "Eva Sterling", clientInitials: "ES", vendor: "Muted Entertainment", category: "Entertainment", amount: "$34,000.00", status: "Refunded", date: "Oct 29", time: "12:25 GMT" },
  { id: "#TX-8830", clientName: "David Knox", clientInitials: "DK", vendor: "Titan Logistics", category: "Logistics", amount: "$12,750.00", status: "Success", date: "Oct 29", time: "09:44 GMT" },
];

// ─── Config Maps ──────────────────────────────────────────────────────────────
const statusConfig: Record<TxStatus, { dot: string; text: string; bg: string; label: string }> = {
  Success: { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-500/10", label: "Success" },
  Processing: { dot: "bg-blue-400", text: "text-blue-400", bg: "bg-blue-500/10", label: "Processing" },
  Failed: { dot: "bg-red-400", text: "text-red-400", bg: "bg-red-500/10", label: "Failed" },
  Refunded: { dot: "bg-amber-400", text: "text-amber-400", bg: "bg-amber-500/10", label: "Refunded" },
};

const categoryColors: Record<TxCategory, string> = {
  "Score Import": "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "Backstage": "bg-pink-500/15 text-pink-300 border-pink-500/20",
  "Media Sync": "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  "Venue Hire": "bg-orange-500/15 text-orange-300 border-orange-500/20",
  "Security": "bg-red-500/15 text-red-300 border-red-500/20",
  "Logistics": "bg-blue-500/15 text-blue-300 border-blue-500/20",
  "Lighting": "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
  "Catering": "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  "Entertainment": "bg-purple-500/15 text-purple-300 border-purple-500/20",
};

const avatarColors: Record<string, string> = {
  AT: "bg-violet-500/20 text-violet-300", SM: "bg-pink-500/20 text-pink-300",
  EV: "bg-cyan-500/20 text-cyan-300", JW: "bg-orange-500/20 text-orange-300",
  CL: "bg-teal-500/20 text-teal-300", MB: "bg-blue-500/20 text-blue-300",
  OP: "bg-rose-500/20 text-rose-300", HK: "bg-amber-500/20 text-amber-300",
  ES: "bg-indigo-500/20 text-indigo-300", DK: "bg-stone-500/20 text-stone-300",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#F2CA50]/20 rounded-sm px-3 py-2 shadow-xl">
      <p className="text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">{label}</p>
      <p className="text-sm font-semibold text-[#F2CA50] font-serif">${(payload[0].value * 100).toLocaleString()}K</p>
    </div>
  );
}

const TOTAL_PAGES = 421;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminTransactionsPage() {
  const [chartTab, setChartTab] = useState<"DAILY" | "WEEKLY" | "MONTHLY">("DAILY");
  const [statusFilter, setStatusFilter] = useState<"All Transactions" | TxStatus>("All Transactions");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const chartData = chartTab === "DAILY" ? dailyData : chartTab === "WEEKLY" ? weeklyData : monthlyData;
  const filtered = transactions.filter((tx) =>
    statusFilter === "All Transactions" || tx.status === statusFilter
  );

  const stats = [
    { label: "Total Revenue", value: "$12.4M", Icon: DollarSign, barColor: "#F2CA50", barW: "72%", valueColor: "text-[#F2CA50]" },
    { label: "Platform GMV", value: "$85.2M", Icon: BarChart3, barColor: "#34d399", barW: "88%", valueColor: "text-[#F2CA50]" },
    { label: "Commission", value: "$8.5M", Icon: Percent, barColor: "#60a5fa", barW: "55%", valueColor: "text-[#F2CA50]" },
    { label: "Successful Trans.", value: "4.2k", Icon: CheckCircle2, barColor: "#34d399", barW: "80%", valueColor: "text-emerald-300" },
    { label: "Failed Payments", value: "12", Icon: AlertTriangle, barColor: "#f87171", barW: "8%", valueColor: "text-red-400" },
  ];

  const paginationItems: (number | "...")[] = [1, 2, 3, "...", TOTAL_PAGES];

  return (
    <div className="space-y-5 w-full" onClick={() => setFilterOpen(false)}>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#161616] border border-white/6 rounded-sm p-5 flex flex-col gap-3 hover:border-white/12 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <s.Icon className="h-4 w-4 text-stone-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold leading-snug">{s.label}</p>
              <p className={`text-2xl font-semibold font-serif mt-1 ${s.valueColor}`}>{s.value}</p>
            </div>
            <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: s.barW, backgroundColor: s.barColor }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Revenue Chart ── */}
      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-base font-semibold text-stone-100 font-serif tracking-wide">Revenue over Time</h2>
          <div className="flex items-center gap-1 bg-white/5 rounded-sm p-1">
            {(["DAILY", "WEEKLY", "MONTHLY"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setChartTab(tab)}
                className={`px-3 py-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.12em] rounded-sm transition-all duration-200 cursor-pointer ${chartTab === tab ? "bg-[#F2CA50] text-[#111111]" : "text-stone-500 hover:text-stone-300"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-2 pb-4 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F2CA50" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#F2CA50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "rgba(120,113,108,0.8)", fontSize: 10, fontFamily: "sans-serif" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(242,202,80,0.15)", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#F2CA50"
                strokeWidth={2}
                fill="url(#goldGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#F2CA50", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Ledger Table ── */}
      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-base font-semibold text-stone-100 font-serif tracking-wide">Ledger Entries</h2>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs text-stone-500 font-sans uppercase tracking-[0.1em]">Filter by status:</span>
            <div className="relative">
              <button
                onClick={() => setFilterOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-sans font-semibold uppercase tracking-[0.1em] bg-white/5 border border-white/10 hover:border-white/20 text-stone-300 rounded-sm transition-all duration-200 cursor-pointer"
              >
                {statusFilter}
                <ChevronDown
                  className={`h-3 w-3 text-stone-500 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
                  strokeWidth={2}
                />
              </button>
              {filterOpen && (
                <div className="absolute right-0 top-full mt-1.5 z-30 bg-[#1a1a1a] border border-white/10 rounded-sm shadow-2xl min-w-[180px] overflow-hidden">
                  {(["All Transactions", "Success", "Processing", "Failed", "Refunded"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setFilterOpen(false); }}
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

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  { label: "ID", align: "text-left" },
                  { label: "Client", align: "text-left" },
                  { label: "Vendor", align: "text-left" },
                  { label: "Category", align: "text-left" },
                  { label: "Amount", align: "text-right" },
                  { label: "Status", align: "text-left" },
                  { label: "Date", align: "text-left" },
                  { label: "Invoice", align: "text-center" },
                ].map((h) => (
                  <th key={h.label} className={`py-3.5 px-4 text-[10px] uppercase tracking-[0.12em] text-stone-500 font-semibold ${h.align}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map((tx) => {
                const sc = statusConfig[tx.status];
                return (
                  <tr key={tx.id} className="hover:bg-white/2 transition-colors duration-150">
                    <td className="px-4 py-3.5 text-[#F2CA50] font-semibold text-xs whitespace-nowrap">{tx.id}</td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${avatarColors[tx.clientInitials] ?? "bg-stone-800 text-stone-300"}`}>
                          {tx.clientInitials}
                        </div>
                        <span className="text-stone-200 font-semibold text-xs whitespace-nowrap">{tx.clientName}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-stone-400 text-xs whitespace-nowrap">{tx.vendor}</td>

                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded-sm border text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap ${categoryColors[tx.category]}`}>
                        {tx.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right text-sm font-semibold text-stone-100 whitespace-nowrap">
                      {tx.amount}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm ${sc.bg}`}>
                        <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${sc.text}`}>{sc.label}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-stone-500 text-[11px] whitespace-nowrap leading-relaxed">
                      <div>{tx.date}</div>
                      <div className="text-stone-600">{tx.time}</div>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <button className="h-7 w-7 mx-auto flex items-center justify-center rounded-sm bg-white/5 border border-white/8 hover:bg-white/10 hover:border-[#F2CA50]/25 text-stone-400 hover:text-[#F2CA50] transition-all duration-150 cursor-pointer">
                        <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-stone-500 font-sans">Showing 1–10 of 4,210 transactions</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 flex items-center justify-center rounded-sm border border-white/8 text-stone-400 hover:text-stone-200 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
            </button>

            {paginationItems.map((page, idx) =>
              page === "..." ? (
                <span key={`e-${idx}`} className="h-8 w-8 flex items-center justify-center text-xs text-stone-600 font-sans">…</span>
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
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}