"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push(`/forgot-password/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center overflow-y-auto bg-zinc-950 px-6 py-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/auth.png')" }}
      />

      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {/* Brand Title */}
        <Link href="/started" className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[0.15em] text-[#F2CA50] uppercase font-serif drop-shadow-[0_2px_10px_rgba(242,202,80,0.2)]">
            Ophir Reserve
          </h2>
        </Link>

        {/* Card */}
        <div className="w-full bg-zinc-950/75 backdrop-blur-md border border-[#F2CA50]/30 rounded-sm p-6 sm:p-10 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-[#F2CA50]/10 border border-[#F2CA50]/30 flex items-center justify-center">
              <svg className="h-8 w-8 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-stone-100 font-serif tracking-wide">
              Forgot Password?
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-2 tracking-wide">
              Enter your email and we'll send a verification code
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 font-sans font-semibold tracking-[0.12em] rounded-sm uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] cursor-pointer text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending Code...
                </>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="flex justify-center mt-8 text-xs text-stone-400 font-sans tracking-wide">
            Remember your password?{" "}
            <Link href="/login" className="text-[#F2CA50] hover:underline uppercase tracking-wider font-semibold ml-1">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
