import Image from "next/image";

const heritageItems = [
  {
    title: "African Heritage",
    description: "Vibrant traditions, rhythmic celebrations, and the timeless...",
    image: "/african.png", // Fallback path, though user mentioned heritage.png
  },
  {
    title: "South Asian Heritage",
    description: "The grandeur of royal courts, intricate artistry, and centuries of...",
    image: "/asian.png",
  },
  {
    title: "Latino Heritage",
    description: "Warmth, family, and the passionate spirit of celebration across the...",
    image: "/heritage.png",
  },
];

export default function Heritage() {
  return (
    <section className="bg-[#131313] py-24 px-8 font-montserrat">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F2CA50] font-bold block mb-4">
            THE COLLECTION
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-tight">
            Explore the Heritage
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {heritageItems.map((item, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden bg-[#111111] border border-[#584922] ${
                index === 1 ? "md:mt-12" : "" // Middle card slight offset like in the image
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <h3 className="text-2xl font-serif text-stone-100 mb-3 group-hover:text-[#F2CA50] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
