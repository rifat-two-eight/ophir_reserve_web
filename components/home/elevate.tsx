import Link from "next/link";

export default function Elevate() {
  return (
    <section className="relative h-[600px] w-full flex items-center overflow-hidden font-montserrat">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/elevate.png')" }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#F2CA50] font-bold block mb-6">
            FOR ARTISANS
          </span>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-100 mb-8 leading-[1.2] tracking-tight">
            Elevate Your Artistry to the Reserve.
          </h2>

          {/* Description */}
          <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-12 max-w-xl font-light">
            We are looking for elite service providers who specialize in cultural excellence. Join our exclusive network of vetted heritage experts.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/signup/register" 
              className="px-10 py-4 bg-[#F2CA50] text-[#0D0D0D] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#d9b540] transition-all duration-300 shadow-lg shadow-black/20 text-center"
            >
              APPLY TO JOIN
            </Link>
            <Link 
              href="/vendor/login" 
              className="px-10 py-4 bg-transparent border border-[#F2CA50]/40 text-[#F2CA50] text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#F2CA50]/5 transition-all duration-300 text-center"
            >
              VENDOR PORTAL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
