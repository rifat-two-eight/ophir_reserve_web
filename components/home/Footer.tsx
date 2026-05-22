import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#131313] py-20 px-8 font-montserrat border-t border-white/5">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        
        {/* Logo */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F2CA50] tracking-[0.2em] uppercase">
            OPHIR RESERVE
          </h2>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12">
          <Link 
            href="/privacy" 
            className="text-[10px] uppercase tracking-[0.3em] text-stone-300 hover:text-[#F2CA50] transition-colors font-semibold"
          >
            PRIVACY POLICY
          </Link>
          <Link 
            href="/terms" 
            className="text-[10px] uppercase tracking-[0.3em] text-stone-300 hover:text-[#F2CA50] transition-colors font-semibold"
          >
            TERMS OF SERVICE
          </Link>
          <Link 
            href="/vendor/login" 
            className="text-[10px] uppercase tracking-[0.3em] text-stone-300 hover:text-[#F2CA50] transition-colors font-semibold"
          >
            VENDOR PORTAL
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-16">
          <a href="#" className="text-[#F2CA50] hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </a>
          <a href="#" className="text-[#F2CA50] hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </a>
          <a href="#" className="text-[#F2CA50] hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-stone-400 text-[10px] uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} OPHIR RESERVE. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}
