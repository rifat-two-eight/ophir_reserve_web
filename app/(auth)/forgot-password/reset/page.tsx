"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function getPasswordStrength(password: string): { label: string; bars: number; color: string } {
  if (!password) return { label: "", bars: 0, color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { label: "Weak", bars: 1, color: "#ef4444" };
  if (score === 2) return { label: "Fair", bars: 2, color: "#f59e0b" };
  if (score === 3) return { label: "Good", bars: 3, color: "#84cc16" };
  return { label: "Strong", bars: 4, color: "#22c55e" };
}

function ResetContent() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const strength = getPasswordStrength(newPassword);
  const passwordMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1800));
    router.push("/login");
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
            <div
              className={`h-16 w-16 rounded-full border flex items-center justify-center transition-all duration-500 ${success
                  ? "bg-emerald-500/15 border-emerald-500/40"
                  : "bg-[#F2CA50]/10 border-[#F2CA50]/30"
                }`}
            >
              {success ? (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-[#F2CA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-stone-100 font-serif tracking-wide">
              {success ? "Password Changed!" : "Create New Password"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-2 tracking-wide">
              {success
                ? "Redirecting you to login..."
                : "Your new password must be different from your previous one"}
            </p>
          </div>

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-12 py-3 bg-[#F2CA50]/8 border border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50] text-stone-100 rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-200 focus:outline-none cursor-pointer"
                  >
                    <EyeIcon visible={showNew} />
                  </button>
                </div>

              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-300 font-sans font-semibold mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-4 pr-12 py-3 bg-[#F2CA50]/8 border rounded-sm outline-none transition-all duration-200 text-sm font-sans placeholder-zinc-400 text-stone-100 ${passwordMismatch
                        ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : passwordMatch
                          ? "border-emerald-500/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                          : "border-[#F2CA50]/20 focus:border-[#F2CA50] focus:ring-1 focus:ring-[#F2CA50]"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-200 focus:outline-none cursor-pointer"
                  >
                    <EyeIcon visible={showConfirm} />
                  </button>
                </div>
                {passwordMismatch && (
                  <p className="mt-1.5 text-xs text-red-400 font-sans">Passwords do not match</p>
                )}
                {passwordMatch && (
                  <p className="mt-1.5 text-xs text-emerald-400 font-sans">Passwords match</p>
                )}
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || passwordMismatch || !newPassword || !confirmPassword}
                className="w-full mt-2 py-3.5 bg-[#F2CA50] hover:bg-[#e0b83b] text-stone-950 font-sans font-semibold tracking-[0.12em] rounded-sm uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] cursor-pointer text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {/* Back to Login */}
          {!success && (
            <div className="flex justify-center mt-8 text-xs text-stone-400 font-sans tracking-wide">
              Remember your password?{" "}
              <Link href="/login" className="text-[#F2CA50] hover:underline uppercase tracking-wider font-semibold ml-1">
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetContent />
    </Suspense>
  );
}
