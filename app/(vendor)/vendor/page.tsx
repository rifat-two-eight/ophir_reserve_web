"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Monthly Revenue Data ───────────────────────────────────────────────────
const revenueData = [
  { month: "APR", revenue: 38000, target: 45000 },
  { month: "MAY", revenue: 52000, target: 45000 },
  { month: "JUN", revenue: 47000, target: 50000 },
  { month: "JUL", revenue: 61000, target: 55000 },
  { month: "AUG", revenue: 58000, target: 55000 },
  { month: "SEP", revenue: 74000, target: 65000 },
];

// ─── Inquiries Data ─────────────────────────────────────────────────────────
const inquiries = [
  {
    id: 1,
    name: "Julianna Sterling",
    initials: "JS",
    event: "Enchanted Garden Gala",
    date: "Oct 18, 2024",
    guests: 120,
    status: "New",
  },
  {
    id: 2,
    name: "Arthur Montgomery",
    initials: "AM",
    event: "Black Tie Dinner Soirée",
    date: "Nov 2, 2024",
    guests: 85,
    status: "New",
  },
  {
    id: 3,
    name: "Elena Costas",
    initials: "EC",
    event: "Coastal Farewell Ceremony",
    date: "Nov 15, 2024",
    guests: 200,
    status: "New",
  },
];

// ─── Calendar Data ───────────────────────────────────────────────────────────
const calendarDays = (() => {
  const days: (number | null)[] = [];
  // Oct 2024 starts on Tuesday (index 1, Mon=0)
  for (let i = 0; i < 1; i++) days.push(null);
  for (let d = 1; d <= 31; d++) days.push(d);
  return days;
})();

const bookedDays = new Set([2, 14]);
const tentativeDays = new Set([7, 21]);

const calendarEvents = [
  { day: 14, time: "18:00", label: "Sterling Heritage Gala" },
  { day: 28, time: "10:00", label: "Vendor Networking Summit" },
];

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-3 shadow-xl">
        <p className="text-xs uppercase tracking-widest text-stone-400 font-sans mb-2">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm font-sans font-semibold" style={{ color: entry.name === "Revenue" ? "#F2CA50" : "#4e7caa" }}>
            {entry.name}: ${(entry.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  gold,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  gold?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-sm p-6 bg-[#161616] overflow-hidden transition-all duration-300 hover:bg-[#1a1a1a] ${gold ? "border border-[#F2CA50]/30" : "border border-white/5 hover:border-white/10"
        }`}
    >
      {/* Subtle glow for gold card */}
      {gold && (
        <div className="absolute inset-0 bg-[#F2CA50]/3 pointer-events-none" />
      )}
      <div className="flex items-start justify-between">
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-sm ${gold
            ? "bg-[#F2CA50]/15 border border-[#F2CA50]/25 text-[#F2CA50]"
            : "bg-white/5 border border-white/8 text-stone-400"
            }`}
        >
          {icon}
        </div>
        <span
          className={`text-[10px] uppercase tracking-widest font-sans px-2 py-1 rounded-sm ${gold
            ? "bg-[#F2CA50]/10 text-[#F2CA50]/70 border border-[#F2CA50]/15"
            : "bg-white/4 text-stone-600 border border-white/5"
            }`}
        >
          YTD
        </span>
      </div>
      <div>
        <p
          className={`text-3xl font-semibold font-serif leading-none ${gold ? "text-[#F2CA50]" : "text-stone-100"
            }`}
        >
          {value}
        </p>
        <p className="text-xs text-stone-500 font-sans mt-1.5 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-xs text-stone-600 font-sans">{sub}</p>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function VendorOverviewPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(14);

  const selectedEvents = calendarEvents.filter((e) => e.day === selectedDay);

  return (
    <div className="space-y-6 w-full">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Earnings"
          value="$124,500"
          sub="+18.4% from last period"
          gold
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Active Leads"
          value="18"
          sub="3 new since last week"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Booking Rate"
          value="82%"
          sub="Above 74% industry avg"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <StatCard
          label="Review Score"
          value="4.9/5.0"
          sub="Based on 214 reviews"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          }
        />
      </div>

      {/* ── Middle Row: Inquiries + Calendar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* New Inquiries */}
        <div className="lg:col-span-2 bg-[#161616] border border-white/5 rounded-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <h3 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
              New Inquiries
            </h3>
            <button className="text-[10px] uppercase tracking-[0.15em] text-[#F2CA50]/70 font-sans hover:text-[#F2CA50] transition-colors duration-200 cursor-pointer">
              View All
            </button>
          </div>
          <div className="divide-y divide-white/4">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors duration-200"
              >
                {/* Avatar */}
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-[#F2CA50] font-sans">{inq.initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-200 font-sans truncate">{inq.name}</p>
                  <p className="text-xs text-stone-500 font-sans truncate mt-0.5">
                    {inq.event} · {inq.date} · {inq.guests} guests
                  </p>
                </div>

                {/* Badge */}
                <span className="hidden sm:block flex-shrink-0 text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans">
                  {inq.status}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="text-[10px] uppercase tracking-[0.12em] font-sans font-semibold px-3 py-1.5 border border-white/10 text-stone-400 hover:border-white/20 hover:text-stone-200 rounded-sm transition-all duration-200 cursor-pointer">
                    Details
                  </button>
                  <button className="text-[10px] uppercase tracking-[0.12em] font-sans font-semibold px-3 py-1.5 bg-[#F2CA50]/15 border border-[#F2CA50]/30 text-[#F2CA50] hover:bg-[#F2CA50]/25 hover:border-[#F2CA50]/50 rounded-sm transition-all duration-200 cursor-pointer">
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Calendar */}
        <div className="lg:col-span-1 bg-[#161616] border border-white/5 rounded-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
            <h3 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
              Booking Calendar
            </h3>
            <span className="text-xs text-stone-500 font-sans">Oct 2024</span>
          </div>

          <div className="px-4 pt-4">
            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="text-center text-[10px] uppercase tracking-widest text-stone-600 font-sans py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} />;
                }
                const isBooked = bookedDays.has(day);
                const isTentative = tentativeDays.has(day);
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative aspect-square flex items-center justify-center text-xs font-sans rounded-sm transition-all duration-200 cursor-pointer ${isBooked
                      ? "bg-[#F2CA50] text-[#0D0D0D] font-semibold"
                      : isTentative
                        ? "border border-[#F2CA50]/40 text-[#F2CA50]/80 hover:bg-[#F2CA50]/10"
                        : isSelected
                          ? "bg-white/10 text-stone-200 border border-white/15"
                          : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
                      }`}
                  >
                    {day}
                    {calendarEvents.some((e) => e.day === day) && !isBooked && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0.5 rounded-full bg-[#F2CA50]/60" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-5 py-3 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-sm bg-[#F2CA50]" />
              <span className="text-[10px] text-stone-500 font-sans">Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-sm border border-[#F2CA50]/40" />
              <span className="text-[10px] text-stone-500 font-sans">Tentative</span>
            </div>
          </div>

          {/* Selected day events */}
          <div className="border-t border-white/5 px-5 py-4 flex-1">
            {selectedDay ? (
              <>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-3">
                  {selectedEvents.length > 0 ? `Oct ${selectedDay} Events` : `Oct ${selectedDay} — No events`}
                </p>
                {selectedEvents.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvents.map((ev, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#F2CA50] mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-stone-300 font-sans font-semibold">{ev.label}</p>
                          <p className="text-[10px] text-stone-600 font-sans mt-0.5">Oct {ev.day} · {ev.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-600 font-sans">No bookings on this date.</p>
                )}

                {/* Always show the two important events */}
                {selectedEvents.length === 0 && (
                  <div className="mt-3 space-y-2">
                    {calendarEvents.map((ev, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedDay(ev.day)}
                        className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-stone-600 mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-stone-500 font-sans">{ev.label}</p>
                          <p className="text-[10px] text-stone-700 font-sans mt-0.5">Oct {ev.day} · {ev.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-xs text-stone-600 font-sans">Select a date to view events.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom: Monthly Revenue Growth ── */}
      <div className="bg-[#161616] border border-white/5 rounded-sm overflow-hidden">
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h3 className="text-base font-semibold text-stone-100 font-serif tracking-wide">
              Monthly Revenue Growth
            </h3>
            <p className="text-xs text-stone-500 font-sans mt-1">Year-to-date performance vs target</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-[#F2CA50]" />
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-[#4e7caa]" />
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans">Target</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-6 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              barCategoryGap="35%"
              barGap={4}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.04)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "var(--font-sans, sans-serif)", letterSpacing: "0.1em" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4b5563", fontSize: 10, fontFamily: "var(--font-sans, sans-serif)" }}
                tickFormatter={(v) => `$${v / 1000}k`}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="target" name="Target" fill="#4e7caa" radius={[2, 2, 0, 0]} />
              <Bar dataKey="revenue" name="Revenue" fill="#F2CA50" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
