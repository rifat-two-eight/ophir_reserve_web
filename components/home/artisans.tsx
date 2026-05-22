import Link from "next/link";

const artisanItems = [
  {
    category: "EAST ASIAN",
    title: "East Asian Heritage",
    tags: ["CHINESE TEA CEREMONY", "TRADITIONAL HANBOK"],
    image: "/east.png", // Placeholder
  },
  {
    category: "CARIBBEAN",
    title: "Island Rhythms",
    tags: ["BEACHSIDE GALA", "HERITAGE CARNIVAL"],
    image: "/island.png", // Placeholder
  },
  {
    category: "LATINO",
    title: "Latino Passions",
    tags: ["QUINCEAÑERA ELITE", "HACIENDA WEDDINGS"],
    image: "/latino.png", // Placeholder
  },
];

export default function Artisans() {
  return (
    <section className="bg-[#1C1B1B] py-24 px-8 font-montserrat">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#F2CA50] font-bold block mb-4">
            THE RESERVE
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-tight">
            Premier Artisans
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisanItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-black overflow-hidden border border-[#584922]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#F2CA50] font-bold mb-3 block">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-serif text-stone-100 mb-6">
                    {item.title}
                  </h3>
                  
                  {/* Tags */}
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

                  {/* Discover Button */}
                  <Link 
                    href="/cultures" 
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

        {/* See All Link */}
        <div className="mt-12 flex justify-end">
          <Link 
            href="/cultures" 
            className="text-[10px] uppercase tracking-[0.3em] text-[#F2CA50] hover:text-stone-400 font-bold transition-colors flex items-center gap-2 group"
          >
            SEE ALL
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
