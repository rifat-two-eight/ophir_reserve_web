"use client";

import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const stats = [
  {
    label: "Platform GMV",
    value: "$12,842.50",
    sub: "+8.2% this month",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Active Vendors",
    value: "1,248",
    sub: "+34 this week",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    label: "User Growth",
    value: "42.5K",
    sub: "+12.4% this month",
    positive: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const vendorQueue = [
  { name: "Kyoto Silk Heritage", owner: "Hiroshi Tanaka", focus: "Japanese", date: "Oct 24, 2024" },
  { name: "Marrakech Royal Tents", owner: "Zaid Al-Fassi", focus: "Moroccan", date: "Oct 23, 2024" },
  { name: "Etoile Concierge Services", owner: "Claire Dubois", focus: "French", date: "Oct 22, 2024" },
  { name: "Petra Desert Experiences", owner: "Layla Mansour", focus: "Arabian", date: "Oct 20, 2024" },
];

const transactions = [
  { ref: "#OPH-88421", amount: "$12,400.00", commission: "$744.00", payout: "$11,656.00", status: "Settled" },
  { ref: "#OPH-88428", amount: "$4,250.00", commission: "$255.00", payout: "$3,995.00", status: "Pending" },
  { ref: "#OPH-88419", amount: "$28,000.00", commission: "$1,680.00", payout: "$26,320.00", status: "Settled" },
  { ref: "#OPH-88415", amount: "$7,100.00", commission: "$426.00", payout: "$6,674.00", status: "Processing" },
  { ref: "#OPH-88410", amount: "$3,500.00", commission: "$210.00", payout: "$3,290.00", status: "Settled" },
];

const focusColors: Record<string, string> = {
  Japanese: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Moroccan: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  French: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Arabian: "bg-purple-500/15 text-purple-300 border-purple-500/20",
};

const statusColors: Record<string, string> = {
  Settled: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Processing: "bg-blue-500/15 text-blue-300 border-blue-500/20",
};

// Recharts donut chart for Service Distribution
function DonutChart() {
  const chartData = [
    { name: "Heritage Events", value: 45, color: "#F2CA50" },
    { name: "Private Curations", value: 25, color: "#4ade80" },
    { name: "Legacy Artisans", value: 30, color: "#6b7280" },
  ];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-full h-44 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={66}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#161616" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "2px",
                color: "#e2e8f0",
                fontSize: "11px",
                fontFamily: "var(--font-sans)",
              }}
              itemStyle={{ color: "#e2e8f0" }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text overlay */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-semibold text-[#F2CA50] font-sans leading-none">24</span>
          <span className="text-[8px] tracking-[0.15em] text-stone-500 font-sans uppercase font-semibold mt-1">Cultures</span>
        </div>
      </div>
      <div className="w-full space-y-2">
        {chartData.map((seg) => (
          <div key={seg.name} className="flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-stone-400">{seg.name}</span>
            </div>
            <span className="font-semibold text-stone-300">{seg.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-7 w-full">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161616] border border-white/6 rounded-sm p-7 flex flex-col gap-4 hover:border-[#F2CA50]/20 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.15em] text-stone-500 font-sans font-semibold">
                {stat.label}
              </span>
              <span className="text-stone-500 h-6 w-6">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#F2CA50] font-serif mt-1">{stat.value}</p>
              <p className={`text-xs font-sans mt-1.5 ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Vendor Queue + Service Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Vendor Verification Queue */}
        <div className="lg:col-span-2 bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <h2 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
              Vendor Verification Queue
            </h2>
            <Link
              href="/admin/vendors"
              className="text-xs uppercase tracking-[0.12em] text-[#F2CA50] hover:underline font-sans font-semibold"
            >
              View All Requests
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    Vendor Entity
                  </th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    Cultural Focus
                  </th>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    Submission Date
                  </th>
                  <th className="text-center px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {vendorQueue.map((vendor) => (
                  <tr key={vendor.name} className="hover:bg-white/2 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <p className="text-sm text-stone-200 font-semibold">{vendor.name}</p>
                      <p className="text-stone-600 text-xs mt-0.5">{vendor.owner}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-sm border text-xs uppercase tracking-wider font-semibold ${focusColors[vendor.focus] ?? "bg-stone-800 text-stone-400 border-stone-700"}`}>
                        {vendor.focus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-stone-400">{vendor.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="h-8 w-8 rounded-sm bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 transition-colors cursor-pointer">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button className="h-8 w-8 rounded-sm bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors cursor-pointer">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-[#161616] border border-white/6 rounded-sm p-7">
          <h2 className="text-base font-semibold text-stone-100 font-serif tracking-wide mb-6">
            Service Distribution
          </h2>
          <DonutChart />
        </div>
      </div>

      {/* Global Transactions Feed - Full Width */}
      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
            Global Transactions Feed
          </h2>
          <Link
            href="/admin/transactions"
            className="text-xs uppercase tracking-[0.12em] text-[#F2CA50] hover:underline font-sans font-semibold"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Reference</th>
                <th className="text-right px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Total Amount</th>
                <th className="text-right px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Commission (6%)</th>
                <th className="text-right px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Vendor Payout</th>
                <th className="text-center px-6 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {transactions.map((tx) => (
                <tr key={tx.ref} className="hover:bg-white/2 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-[#F2CA50] font-semibold">{tx.ref}</td>
                  <td className="px-5 py-4 text-right text-sm text-stone-200">{tx.amount}</td>
                  <td className="px-5 py-4 text-right text-sm text-stone-400">{tx.commission}</td>
                  <td className="px-5 py-4 text-right text-sm text-stone-200">{tx.payout}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-sm border text-xs uppercase tracking-wider font-semibold ${statusColors[tx.status] ?? "bg-stone-800 text-stone-400 border-stone-700"}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
