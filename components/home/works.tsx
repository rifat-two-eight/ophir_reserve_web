export default function Works() {
  return (
    <section className="bg-[#353535] py-24 px-8 font-montserrat">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-tight">
            How the Reserve Works
          </h2>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[320px]">
          
          {/* DISCOVER - Large Vertical Card */}
          <div className="lg:col-span-5 lg:row-span-2 bg-[#0D0D0D] p-12 flex flex-col justify-center border border-white/5 group hover:border-[#F2CA50]/30 transition-all duration-500">
            <div className="mb-8">
              <svg className="w-10 h-10 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif text-stone-100 mb-6 group-hover:text-[#F2CA50] transition-colors uppercase tracking-widest">
              DISCOVER
            </h3>
            <p className="text-stone-400 leading-relaxed font-light text-lg">
              Access a curated ecosystem of world-class vendors, each vetted for their cultural expertise and high-end service standards.
            </p>
          </div>

          {/* CONNECT - Square Card with border */}
          <div className="lg:col-span-3 lg:row-span-1 bg-[#1A1A1A]/40 border border-[#F2CA50]/20 p-8 flex flex-col items-center justify-center text-center group hover:bg-[#1A1A1A]/60 transition-all duration-500">
            <div className="mb-6">
              <svg className="w-8 h-8 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-sm font-serif text-stone-100 mb-4 uppercase tracking-[0.3em]">CONNECT</h4>
            <p className="text-stone-500 text-xs leading-relaxed font-light tracking-wide max-w-[200px]">
              Direct lines to elite artisans around the globe.
            </p>
          </div>

          {/* RESERVE - Square Card */}
          <div className="lg:col-span-4 lg:row-span-1 bg-[#0D0D0D] p-8 flex flex-col items-center justify-center text-center border border-white/5 group hover:border-[#F2CA50]/30 transition-all duration-500">
            <div className="mb-6">
              <svg className="w-8 h-8 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-sm font-serif text-stone-100 mb-4 uppercase tracking-[0.3em]">RESERVE</h4>
            <p className="text-stone-500 text-xs leading-relaxed font-light tracking-wide max-w-[200px]">
              Secure dates with priority booking access.
            </p>
          </div>

          {/* SECURE TRANSACTIONS - Wide Card */}
          <div className="lg:col-span-7 lg:row-span-1 bg-[#0D0D0D] p-10 flex items-center gap-10 border border-white/5 group hover:border-[#F2CA50]/30 transition-all duration-500">
            <div className="flex-shrink-0">
              <svg className="w-10 h-10 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-serif text-stone-100 mb-3 uppercase tracking-widest">SECURE TRANSACTIONS</h4>
              <p className="text-stone-500 text-sm leading-relaxed font-light">
                Escrow-protected payments for absolute peace of mind.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
