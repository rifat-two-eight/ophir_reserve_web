import Link from "next/link";

export default function CultureDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="bg-[#0D0D0D] min-h-screen pt-32 pb-24 px-8 font-montserrat">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Back Link */}
        <Link 
          href="/cultures" 
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F2CA50] font-bold mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Collection
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/5">
            <img 
              src="/latino.png" 
              alt={id}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#F2CA50] font-bold block mb-6">
              HERITAGE DETAILS
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-stone-100 mb-8 tracking-tight uppercase">
              {id.replace(/-/g, ' ')}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed font-light mb-12">
              Discover the intricate details and deep-rooted traditions of this unique cultural heritage. From traditional attire to sacred rituals, we explore the elements that make this culture extraordinary.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12 border-y border-white/5 py-12">
              <div>
                <h4 className="text-[#F2CA50] text-[10px] uppercase tracking-widest font-bold mb-2">ORIGIN</h4>
                <p className="text-stone-200 text-sm">Global Traditions</p>
              </div>
              <div>
                <h4 className="text-[#F2CA50] text-[10px] uppercase tracking-widest font-bold mb-2">VENDORS</h4>
                <p className="text-stone-200 text-sm">15+ Elite Artisans</p>
              </div>
            </div>

            <button className="px-12 py-5 bg-[#F2CA50] text-[#0D0D0D] text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all duration-300 shadow-lg shadow-black/20">
              BOOK AN ARTISAN
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
