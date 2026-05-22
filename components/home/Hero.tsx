"use client";

import { useState } from "react";

export default function Hero() {
  const [service, setService] = useState("");
  const [culture, setCulture] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#F2CA50] mb-16 leading-[1.2] tracking-wide">
          CURATED CULTURE. EXCEPTIONAL <br className="hidden md:block" /> CONNECTIONS.
        </h1>

        {/* Search Bar Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-sm p-1 flex flex-col md:flex-row items-stretch gap-1 shadow-2xl">
            
            {/* Service Input */}
            <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-white/10 group">
              <svg className="w-6 h-6 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <input 
                type="text" 
                placeholder="Service (Catering, Venue...)"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-stone-200 text-xs tracking-wider placeholder:text-stone-500 w-full outline-none"
              />
            </div>

            {/* Culture Input */}
            <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-white/10 group">
              <svg className="w-6 h-6 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <input 
                type="text" 
                placeholder="Culture (African, Asian...)"
                value={culture}
                onChange={(e) => setCulture(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-stone-200 text-xs tracking-wider placeholder:text-stone-500 w-full outline-none"
              />
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-6 py-4 group">
              <svg className="w-6 h-6 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-stone-200 text-xs tracking-wider placeholder:text-stone-500 w-full outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#F2CA50] hover:bg-[#d9b540] text-[#0D0D0D] px-10 py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-sm">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
