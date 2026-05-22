import Link from "next/link";

const cultureGroups = [
  {
    id: "cultures-1",
    label: "CULTURES 1",
    items: [
      { id: "west-african", category: "WEST AFRICAN", title: "West African Traditions", tags: ["IGBO INTRODUCTION", "YORUBA ENGAGEMENT"] },
      { id: "south-asian", category: "SOUTH ASIAN", title: "South Asian Legacies", tags: ["HINDU KUPTHAM", "SUFI ANAND KARAJ"] },
      { id: "middle-eastern", category: "MIDDLE EASTERN", title: "Arabian Splendor", tags: ["ZAFFA PROCESSION", "HENNA NIGHT"] },
    ]
  },
  {
    id: "cultures-2",
    label: "CULTURES 2",
    items: [
      { id: "east-asian", category: "EAST ASIAN", title: "East Asian Heritage", tags: ["CHINESE TEA CEREMONY", "TRADITIONAL HANBOK"] },
      { id: "caribbean", category: "CARIBBEAN", title: "Island Rhythms", tags: ["BEACHSIDE GALA", "HERITAGE CARNIVAL"] },
      { id: "latino", category: "LATINO", title: "Latino Passions", tags: ["QUINCEAÑERA ELITE", "HACIENDA WEDDINGS"] },
    ]
  },
  {
    id: "cultures-3",
    label: "CULTURES 3",
    items: [
      { id: "jewish", category: "JEWISH", title: "Jewish Traditions", tags: ["ORTHODOX CEREMONIALS", "HERITAGE GALA"] },
      { id: "muslim", category: "MUSLIM", title: "Islamic Artistry", tags: ["NIKAH CEREMONY", "WALIMA CELEBRATION"] },
    ]
  }
];

export default function CulturesPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen pt-32 pb-24 px-8 font-montserrat">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-serif text-stone-100 mb-8 tracking-tight">
            The Heritage Collection
          </h1>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
            A curated discovery hub celebrating the depth of global traditions. From sacred ceremonies to vibrant ancestral festivities, we connect you with the vendors who master the art of heritage storytelling.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">FILTER BY:</span>
          <button className="bg-[#1A1A1A] border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-stone-200 rounded-sm flex items-center gap-2 hover:border-[#F2CA50]/30 transition-colors">
            Cultures: All
            <svg className="w-3 h-3 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-24">
          {cultureGroups.map((group) => (
            <div key={group.id} className="relative">
              <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
                <h2 className="text-xl font-bold text-stone-100 tracking-[0.2em] uppercase">{group.label}</h2>
                <Link 
                  href={`/cultures/${group.id}`} 
                  className="text-[10px] uppercase tracking-[0.3em] text-[#F2CA50] hover:text-stone-400 font-bold transition-colors flex items-center gap-2 group"
                >
                  SEE ALL
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {group.items.map((item) => (
                  <div key={item.id} className="group relative bg-black overflow-hidden border border-white/5">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                      <img 
                        src="/latino.png" 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#F2CA50] font-bold mb-3 block">
                          {item.category}
                        </span>
                        <h3 className="text-2xl font-serif text-stone-100 mb-6">
                          {item.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[8px] uppercase tracking-widest text-stone-400 border border-stone-800 px-3 py-1.5 rounded-sm bg-black/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link 
                          href={`/cultures/${item.id}`} 
                          className="w-full py-4 border border-[#F2CA50]/50 text-[#F2CA50] text-[10px] uppercase tracking-[0.3em] font-bold text-center hover:bg-[#F2CA50] hover:text-[#0D0D0D] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          DISCOVER
                          <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
