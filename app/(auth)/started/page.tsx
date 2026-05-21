import Link from "next/link";

export default function StartedGatePage() {
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image - Covers entire viewport */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/auth.png')",
        }}
      />

      {/* Simple transparent overlay to maintain text contrast without obscuring the background */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main Content Container - responsive padding and alignments */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl px-6 md:px-8 select-none">

        {/* Title: OPHIR RESERVE (Playfair Display, Semibold, Uppercase, Elegant Spacing, No Wrap) */}
        <h1 className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl text-[#F2CA50] font-semibold tracking-[0.16em] uppercase mb-5 font-serif leading-none drop-shadow-[0_4px_12px_rgba(242,202,80,0.25)]">
          Ophir Reserve
        </h1>

        {/* Elegant Gold-hued Dividers and Subtitle */}
        <div className="flex items-center gap-3 w-full max-w-md mb-12">
          <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-primary/30 to-primary/60" />
          <p className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.24em] text-stone-300 font-medium uppercase whitespace-nowrap">
            Curated Culture. Exceptional Connections.
          </p>
          <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent via-primary/30 to-primary/60" />
        </div>

        {/* Get Started Button - Styled exactly like the mockup: primary color, dark text, semibold */}
        <Link
          href="/signup"
          className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm py-3.5 bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 font-sans font-semibold tracking-[0.12em] rounded-sm uppercase transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_20px_rgba(242,202,80,0.35)] flex items-center justify-center gap-1.5 cursor-pointer text-sm sm:text-base"
        >
          Get Started <span className="font-sans text-lg sm:text-xl leading-none translate-y-[-1px]">&rsaquo;</span>
        </Link>

        {/* Inline Links: Log In | Sign Up */}
        <div className="flex items-center gap-6 mt-8 sm:mt-10">
          <Link
            href="/login"
            className="text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.15em] text-stone-300 hover:text-primary transition-all duration-200 uppercase relative group py-1"
          >
            Log In
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="text-stone-700 font-sans text-xs">|</span>
          <Link
            href="/signup"
            className="text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.15em] text-stone-300 hover:text-primary transition-all duration-200 uppercase relative group py-1"
          >
            Sign Up
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}
