"use client";

import Link from "next/link";
import { useState } from "react";

export default function VendorsDashboardPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-[#111111] text-stone-100 font-sans pt-24 pb-12 px-6">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">

        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Active Event Card */}
          <div className="relative rounded-sm overflow-hidden h-[300px] group">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
              alt="The Amalfi Vow Renewal"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-20 h-full p-8 flex flex-col justify-between">
              <div>
                <span className="text-[#F2CA50] text-xs uppercase tracking-[0.2em] font-bold mb-2 block">
                  ACTIVE EVENT
                </span>
                <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-2">
                  The Amalfi <br /> Vow Renewal
                </h1>
                <p className="text-stone-300 text-sm tracking-wide">
                  September 24, 2024 - Positano, Italy
                </p>
              </div>

              {/* Days Left Circle */}
              <div className="absolute top-1/2 right-12 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[#F2CA50] flex flex-col items-center justify-center backdrop-blur-sm bg-black/20">
                <span className="text-4xl font-serif text-white mb-1">142</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#F2CA50] font-bold">DAYS LEFT</span>
              </div>
            </div>
          </div>

          {/* Jave Select Vendor Shortlist */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=jave" alt="Jave" className="w-8 h-8 rounded-full border border-stone-700" />
              <h2 className="text-2xl font-serif text-stone-100">Jave select vendor Shortlist</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
                    alt="Atelier Gastronomique"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-stone-100">Atelier <br /> Gastronomique</h3>
                    <span className="bg-[#2a2a2a] text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm text-stone-300 font-medium">
                      QUOTE RECEIVED
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm font-light mb-6">
                    Artisanal catering and molecular service design.
                  </p>
                  <button className="w-full py-3 bg-[#F2CA50] text-[#0D0D0D] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all">
                    REVIEW QUOTE
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop"
                    alt="Maestro Quartets"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-stone-100">Maestro <br /> Quartets</h3>
                    <span className="bg-[#2a1a1a] border border-red-500/20 text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm text-stone-300 font-medium">
                      ACTION NEEDED
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm font-light mb-6">
                    Symphonic arrangements for modern ceremonies.
                  </p>
                  <button className="w-full py-3 bg-transparent border border-[#F2CA50] text-[#F2CA50] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#F2CA50]/10 transition-all">
                    RESPOND NOW
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Rony Select Vendor Shortlist */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=rony" alt="Rony" className="w-8 h-8 rounded-full border border-stone-700" />
              <h2 className="text-2xl font-serif text-stone-100">Rony select vendor Shortlist</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
                    alt="Atelier Gastronomique"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-stone-100">Atelier <br /> Gastronomique</h3>
                    <span className="bg-[#2a2a2a] text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm text-stone-300 font-medium">
                      QUOTE RECEIVED
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm font-light mb-6">
                    Artisanal catering and molecular service design.
                  </p>
                  <button className="w-full py-3 bg-[#F2CA50] text-[#0D0D0D] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all">
                    REVIEW QUOTE
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop"
                    alt="Maestro Quartets"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-stone-100">Maestro <br /> Quartets</h3>
                    <span className="bg-[#2a1a1a] border border-red-500/20 text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm text-stone-300 font-medium">
                      ACTION NEEDED
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm font-light mb-6">
                    Symphonic arrangements for modern ceremonies.
                  </p>
                  <button className="w-full py-3 bg-transparent border border-[#F2CA50] text-[#F2CA50] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#F2CA50]/10 transition-all">
                    RESPOND NOW
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Continue Button */}
          <div className="pt-4">
            <button className="w-full py-4 bg-[#F2CA50] text-[#0D0D0D] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all">
              CONTINUE
            </button>
          </div>

        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">

          {/* Total Budget Card */}
          <div className="bg-[#1a1a1a] border border-[#F2CA50]/30 p-8 rounded-sm">
            <span className="text-[#F2CA50] text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">
              TOTAL BUDGET
            </span>
            <div className="text-4xl font-serif text-white">
              $142,500
            </div>
          </div>

          {/* Milestones Card */}
          <div className="bg-[#1a1a1a] border border-emerald-500/30 p-8 rounded-sm">
            <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-6 block">
              MILESTONES
            </span>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-serif text-white mb-1">4/12</div>
                <div className="text-stone-400 text-xs font-light">Vendors <br /> Booked</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-serif text-white mb-1">68%</div>
                <div className="text-stone-400 text-xs font-light">Tasks <br /> Done</div>
              </div>
            </div>
          </div>

          {/* Collaborative Workspace */}
          <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5">
            <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-6 block">
              COLLABORATIVE WORKSPACE
            </span>

            <div className="flex -space-x-3 mb-8">
              <img className="w-10 h-10 rounded-full border-2 border-[#1a1a1a]" src="https://i.pravatar.cc/150?img=11" alt="Avatar" />
              <img className="w-10 h-10 rounded-full border-2 border-[#1a1a1a]" src="https://i.pravatar.cc/150?img=12" alt="Avatar" />
              <img className="w-10 h-10 rounded-full border-2 border-[#1a1a1a]" src="https://i.pravatar.cc/150?img=13" alt="Avatar" />
              <div className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] bg-[#F2CA50] flex items-center justify-center text-[#0D0D0D] text-xs font-bold z-10">
                +2
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full border border-[#F2CA50]"></div>
                </div>
                <div>
                  <p className="text-stone-200 text-sm font-light leading-relaxed">
                    <span className="font-bold">Marco:</span> "Just uploaded the floral moodboard for the atrium."
                  </p>
                  <span className="text-stone-500 text-[10px] uppercase tracking-wider mt-1 block">14 MINS AGO</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full border border-stone-500"></div>
                </div>
                <div>
                  <p className="text-stone-200 text-sm font-light leading-relaxed">
                    <span className="font-bold">Elena:</span> Changed guest count for reception table 4.
                  </p>
                  <span className="text-stone-500 text-[10px] uppercase tracking-wider mt-1 block">2 HOURS AGO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5 relative">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                UPCOMING PAYMENTS
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-white/5 pb-6">
                <div>
                  <h4 className="font-bold text-stone-100 text-sm mb-1">Venue Deposit</h4>
                  <span className="text-stone-500 text-[10px] uppercase tracking-wider">DUE MAY 15</span>
                </div>
                <span className="text-[#F2CA50] text-sm">$12,000</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-stone-100 text-sm mb-1">Floral Design</h4>
                  <span className="text-stone-500 text-[10px] uppercase tracking-wider">DUE JUN 02</span>
                </div>
                <span className="text-stone-400 text-sm">$4,500</span>
              </div>
            </div>

            {/* Absolute Add Button similar to the design */}
            <button className="absolute top-6 right-6 bg-[#F2CA50] text-[#0D0D0D] px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-sm flex items-center gap-1 hover:bg-[#d9b540] transition-colors">
              ADD <span className="text-lg leading-none">+</span>
            </button>
          </div>

          {/* Proposal Description */}
          <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5">
            <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-4 block">
              PROPOSAL DESCRIPTION
            </span>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Our 'Royal Heritage' suite is meticulously designed for the 2024 Gala. We combine the rhythmic traditions of the Saharan tribes with contemporary ambient soundscapes, creating a multi-sensory journey for your esteemed guests.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
