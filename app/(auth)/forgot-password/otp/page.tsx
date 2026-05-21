"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function OtpContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(60);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}`);
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(Math.max(0, b.length)) + c)
    : "your email";

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-stone-100 font-serif tracking-wide">
              Verify Your Email
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-2 tracking-wide">
              We sent a 6-digit code to
            </p>
            <p className="text-xs sm:text-sm text-[#F2CA50] font-sans mt-1 tracking-wide font-semibold">
              {maskedEmail}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Digit Inputs */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-4 text-center">
                Enter Verification Code
              </label>
              <div className="flex gap-2 sm:gap-3 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl font-semibold bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 font-sans"
                    style={{ width: "clamp(2.5rem, 10vw, 3rem)", height: "clamp(3rem, 12vw, 3.5rem)" }}
                  />
                ))}
              </div>
            </div>

            {/* Resend Timer */}
            <div className="text-center text-xs font-sans text-stone-400">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#F2CA50] hover:underline font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Resend Code
                </button>
              ) : (
                <span>
                  Resend code in{" "}
                  <span className="text-[#F2CA50] font-semibold">
                    {String(Math.floor(resendTimer / 60)).padStart(2, "0")}:
                    {String(resendTimer % 60).padStart(2, "0")}
                  </span>
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || otp.some((d) => d === "")}
              className="w-full py-3.5 bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 font-sans font-semibold tracking-[0.12em] rounded-sm uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] cursor-pointer text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="flex justify-center mt-8 text-xs text-stone-400 font-sans tracking-wide">
            Wrong email?{" "}
            <Link href="/forgot-password" className="text-[#F2CA50] hover:underline uppercase tracking-wider font-semibold ml-1">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpContent />
    </Suspense>
  );
}
